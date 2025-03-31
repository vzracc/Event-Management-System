const express = require("express")
const Task = require("../models/Task")
const Team = require("../models/Team")
const User = require("../models/User")
const { auth, chairpersonAuth } = require("../middleware/auth")
const mongoose = require("mongoose")

const router = express.Router()

// AI-driven task allocation
router.post("/task-allocation", auth, chairpersonAuth, async (req, res) => {
  try {
    const { eventId } = req.body

    if (!eventId) {
      return res.status(400).json({ message: "Valid event ID is required" })
    }

    // Get all unassigned tasks for the event
    const unassignedTasks = await Task.find({
      eventId: mongoose.Types.ObjectId(eventId),
      assignedToId: { $exists: false },
    })

    if (unassignedTasks.length === 0) {
      return res.json({
        message: "No unassigned tasks found for this event",
      })
    }

    // Get all team members for teams involved in the event
    const teamIds = [...new Set(unassignedTasks.map((task) => task.teamId.toString()))]

    // Get all teams
    const teams = await Team.find({
      _id: { $in: teamIds.map((id) => mongoose.Types.ObjectId(id)) },
    })

    // Get all team members
    const teamMembers = []
    teams.forEach((team) => {
      team.members.forEach((member) => {
        teamMembers.push({
          userId: member.userId,
          teamId: team._id,
          name: member.name,
          skills: member.skills || [],
        })
      })
    })

    // Get user details for all team members
    const userIds = teamMembers.map((tm) => tm.userId)
    const users = await User.find({
      _id: { $in: userIds },
    })

    // Get current workload for each user
    const userWorkloads = await Task.aggregate([
      {
        $match: {
          assignedToId: { $in: userIds },
          completed: false,
        },
      },
      {
        $group: {
          _id: "$assignedToId",
          taskCount: { $sum: 1 },
          highPriorityCount: {
            $sum: {
              $cond: [{ $eq: ["$priority", "High"] }, 1, 0],
            },
          },
        },
      },
    ])

    // Create a map of user workloads
    const workloadMap = {}
    userWorkloads.forEach((wl) => {
      workloadMap[wl._id.toString()] = {
        taskCount: wl.taskCount,
        highPriorityCount: wl.highPriorityCount,
      }
    })

    // Enhance user data with workload and skills
    const enhancedUsers = users.map((user) => {
      const teamMember = teamMembers.find((tm) => tm.userId.toString() === user._id.toString())
      return {
        _id: user._id,
        name: user.name,
        teamId: teamMember?.teamId,
        skills: user.skills || teamMember?.skills || [],
        workload: workloadMap[user._id.toString()] || { taskCount: 0, highPriorityCount: 0 },
      }
    })

    // AI Task Allocation Algorithm
    const taskAssignments = []

    for (const task of unassignedTasks) {
      // Filter users by team
      const eligibleUsers = enhancedUsers.filter(
        (user) => user.teamId && user.teamId.toString() === task.teamId.toString(),
      )

      if (eligibleUsers.length === 0) continue

      // Sort users by workload (ascending) and skill match (descending)
      eligibleUsers.sort((a, b) => {
        // First, prioritize skill match
        const aSkillMatch = a.skills.filter((skill) => task.requiredSkills?.includes(skill)).length

        const bSkillMatch = b.skills.filter((skill) => task.requiredSkills?.includes(skill)).length

        if (bSkillMatch !== aSkillMatch) {
          return bSkillMatch - aSkillMatch
        }

        // Then, consider workload
        return a.workload.taskCount - b.workload.taskCount
      })

      // Assign task to the best match
      const assignedUser = eligibleUsers[0]

      taskAssignments.push({
        taskId: task._id,
        userId: assignedUser._id,
        userName: assignedUser.name,
      })

      // Update the user's workload for subsequent assignments
      assignedUser.workload.taskCount += 1
      if (task.priority === "High") {
        assignedUser.workload.highPriorityCount += 1
      }
    }

    // Update tasks in the database
    const bulkOps = taskAssignments.map((assignment) => ({
      updateOne: {
        filter: { _id: assignment.taskId },
        update: {
          $set: {
            assignedToId: assignment.userId,
            assignedToName: assignment.userName,
            aiAssigned: true,
            updatedAt: new Date(),
          },
        },
      },
    }))

    if (bulkOps.length > 0) {
      await Task.bulkWrite(bulkOps)
    }

    res.json({
      message: `Successfully assigned ${taskAssignments.length} tasks`,
      assignedTasks: taskAssignments,
    })
  } catch (error) {
    console.error("AI task allocation error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// AI chatbot
router.post("/chatbot", auth, async (req, res) => {
  try {
    const { message, eventId, chatHistory = [] } = req.body

    if (!message) {
      return res.status(400).json({ message: "Message is required" })
    }

    // Get event details if eventId is provided
    let eventContext = ""
    if (eventId) {
      const Event = require("../models/Event")
      const event = await Event.findById(eventId)

      if (event) {
        eventContext = `
          Event: ${event.title}
          Date: ${event.date}
          Location: ${event.location}
          Description: ${event.description}
        `
      }
    }

    // Simple AI response generation (in a real app, this would use OpenAI or similar)
    let response

    if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
      response = "Hello! How can I help you with your event management today?"
    } else if (message.toLowerCase().includes("event")) {
      response =
        "I can help you with event details, registration, scheduling, and task management. What specific information do you need?"
    } else if (message.toLowerCase().includes("register")) {
      response =
        "To register for an event, go to the event details page and click the 'Register Now' button. You'll need to be logged in to complete registration."
    } else if (message.toLowerCase().includes("task")) {
      response =
        "Tasks are assigned to team members based on their skills and current workload. Our AI system helps optimize task allocation for efficiency."
    } else if (message.toLowerCase().includes("team")) {
      response =
        "Teams are organized by community and can be assigned to specific events. Each team has members with different roles and responsibilities."
    } else {
      response =
        "I'm here to help with your event management needs. You can ask about events, registration, tasks, teams, or any other features of our platform."
    }

    // In a real app, we would save the conversation to the database
    // For now, we'll just return the response

    res.json({
      response,
    })
  } catch (error) {
    console.error("AI chatbot error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

