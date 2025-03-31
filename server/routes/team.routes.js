const express = require("express")
const Team = require("../models/Team")
const User = require("../models/User")
const Task = require("../models/Task")
const { auth, chairpersonAuth } = require("../middleware/auth")
const mongoose = require("mongoose")

const router = express.Router()

// Get teams with optional filters
router.get("/", async (req, res) => {
  try {
    const { communityId, eventId } = req.query

    // Build query based on filters
    const query = {}

    if (communityId) {
      query.communityId = mongoose.Types.ObjectId(communityId)
    }

    // Get teams
    const teams = await Team.find(query)

    // If eventId is provided, get team task stats for the event
    if (eventId) {
      const eventObjectId = mongoose.Types.ObjectId(eventId)

      // For each team, get task stats
      for (const team of teams) {
        const taskStats = await Task.aggregate([
          {
            $match: {
              teamId: team._id,
              eventId: eventObjectId,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              completed: {
                $sum: {
                  $cond: [{ $eq: ["$completed", true] }, 1, 0],
                },
              },
              overdue: {
                $sum: {
                  $cond: [
                    {
                      $and: [{ $eq: ["$completed", false] }, { $lt: ["$dueDate", new Date()] }],
                    },
                    1,
                    0,
                  ],
                },
              },
            },
          },
        ])

        team.tasks = taskStats.length > 0 ? taskStats[0] : { total: 0, completed: 0, overdue: 0 }
      }
    }

    res.json({ teams })
  } catch (error) {
    console.error("Get teams error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get team by ID
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)

    if (!team) {
      return res.status(404).json({ message: "Team not found" })
    }

    res.json(team)
  } catch (error) {
    console.error("Get team error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new team
router.post("/", auth, chairpersonAuth, async (req, res) => {
  try {
    const teamData = req.body

    // Validate required fields
    if (!teamData.name || !teamData.communityId) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    // Add timestamps and default values
    const newTeam = new Team({
      ...teamData,
      createdBy: req.user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      members: teamData.members || [],
    })

    await newTeam.save()

    res.status(201).json({
      message: "Team created successfully",
      teamId: newTeam._id,
      team: newTeam,
    })
  } catch (error) {
    console.error("Create team error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update team
router.put("/:id", auth, chairpersonAuth, async (req, res) => {
  try {
    const updateData = req.body

    // Add updated timestamp
    updateData.updatedAt = new Date()

    const team = await Team.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true })

    if (!team) {
      return res.status(404).json({ message: "Team not found" })
    }

    res.json({
      message: "Team updated successfully",
      team,
    })
  } catch (error) {
    console.error("Update team error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Add member to team
router.post("/:id/members", auth, chairpersonAuth, async (req, res) => {
  try {
    const { userId, role, skills } = req.body

    // Find user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Find team
    const team = await Team.findById(req.params.id)
    if (!team) {
      return res.status(404).json({ message: "Team not found" })
    }

    // Check if user is already a member
    const existingMember = team.members.find((member) => member.userId.toString() === userId)

    if (existingMember) {
      return res.status(400).json({ message: "User is already a member of this team" })
    }

    // Add member to team
    team.members.push({
      userId,
      name: user.name,
      role: role || "Member",
      avatar: user.image,
      initials: user.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      skills: skills || user.skills || [],
    })

    team.updatedAt = new Date()
    await team.save()

    // Update user's teamId
    user.teamId = team._id
    await user.save()

    res.json({
      message: "Member added successfully",
      team,
    })
  } catch (error) {
    console.error("Add team member error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Remove member from team
router.delete("/:id/members/:userId", auth, chairpersonAuth, async (req, res) => {
  try {
    const teamId = req.params.id
    const userId = req.params.userId

    // Find team
    const team = await Team.findById(teamId)
    if (!team) {
      return res.status(404).json({ message: "Team not found" })
    }

    // Remove member from team
    team.members = team.members.filter((member) => member.userId.toString() !== userId)

    team.updatedAt = new Date()
    await team.save()

    // Update user's teamId
    await User.findByIdAndUpdate(userId, { $unset: { teamId: "" } })

    res.json({
      message: "Member removed successfully",
      team,
    })
  } catch (error) {
    console.error("Remove team member error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

