import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// This endpoint handles AI-driven task allocation
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Check if user has permission to allocate tasks
    if (!["admin", "chairperson"].includes(session.user.role)) {
      return NextResponse.json({ error: "You do not have permission to allocate tasks" }, { status: 403 })
    }

    const { eventId } = await request.json()

    if (!eventId || !ObjectId.isValid(eventId)) {
      return NextResponse.json({ error: "Valid event ID is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Get all unassigned tasks for the event
    const unassignedTasks = await db
      .collection("tasks")
      .find({
        eventId: new ObjectId(eventId),
        assignedToId: { $exists: false },
      })
      .toArray()

    if (unassignedTasks.length === 0) {
      return NextResponse.json({
        message: "No unassigned tasks found for this event",
      })
    }

    // Get all team members for teams involved in the event
    const eventTeams = await db
      .collection("eventTeams")
      .find({ eventId: new ObjectId(eventId) })
      .toArray()

    const teamIds = eventTeams.map((et) => et.teamId)

    // Get all team members
    const teamMembers = await db
      .collection("teamMembers")
      .find({ teamId: { $in: teamIds } })
      .toArray()

    // Get user details for all team members
    const userIds = teamMembers.map((tm) => tm.userId)
    const users = await db
      .collection("users")
      .find({ _id: { $in: userIds.map((id) => new ObjectId(id)) } })
      .toArray()

    // Get current workload for each user
    const userWorkloads = await db
      .collection("tasks")
      .aggregate([
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
      .toArray()

    // Create a map of user workloads
    const workloadMap = {}
    userWorkloads.forEach((wl) => {
      workloadMap[wl._id] = {
        taskCount: wl.taskCount,
        highPriorityCount: wl.highPriorityCount,
      }
    })

    // Enhance user data with workload and skills
    const enhancedUsers = users.map((user) => {
      const teamMember = teamMembers.find((tm) => tm.userId === user._id.toString())
      return {
        ...user,
        teamId: teamMember?.teamId,
        skills: user.skills || [],
        workload: workloadMap[user._id.toString()] || { taskCount: 0, highPriorityCount: 0 },
      }
    })

    // AI Task Allocation Algorithm
    // This is a simplified version - in a real app, this would be more sophisticated
    const taskAssignments = []

    for (const task of unassignedTasks) {
      // Filter users by team
      const eligibleUsers = enhancedUsers.filter((user) => {
        const userTeam = teamMembers.find((tm) => tm.userId === user._id.toString())
        return userTeam && userTeam.teamId.toString() === task.teamId.toString()
      })

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
            assignedToId: assignment.userId.toString(),
            assignedToName: assignment.userName,
            aiAssigned: true,
            updatedAt: new Date(),
          },
        },
      },
    }))

    if (bulkOps.length > 0) {
      await db.collection("tasks").bulkWrite(bulkOps)
    }

    return NextResponse.json({
      message: `Successfully assigned ${taskAssignments.length} tasks`,
      assignedTasks: taskAssignments,
    })
  } catch (error) {
    console.error("Error in AI task allocation:", error)
    return NextResponse.json({ error: "Failed to allocate tasks" }, { status: 500 })
  }
}

