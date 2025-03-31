const express = require("express")
const Community = require("../models/Community")
const User = require("../models/User")
const Team = require("../models/Team")
const Event = require("../models/Event")
const { auth, adminAuth } = require("../middleware/auth")
const mongoose = require("mongoose")

const router = express.Router()

// Get all communities
router.get("/", async (req, res) => {
  try {
    const communities = await Community.find()
    res.json({ communities })
  } catch (error) {
    console.error("Get communities error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get community by ID
router.get("/:id", async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)

    if (!community) {
      return res.status(404).json({ message: "Community not found" })
    }

    res.json(community)
  } catch (error) {
    console.error("Get community error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new community
router.post("/", auth, adminAuth, async (req, res) => {
  try {
    const communityData = req.body

    // Validate required fields
    if (!communityData.name || !communityData.fullName || !communityData.college) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    // Add timestamps and default values
    const newCommunity = new Community({
      ...communityData,
      createdBy: req.user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      members: {
        total: 0,
        active: 0,
        leadership: 0,
      },
    })

    await newCommunity.save()

    res.status(201).json({
      message: "Community created successfully",
      communityId: newCommunity._id,
      community: newCommunity,
    })
  } catch (error) {
    console.error("Create community error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update community
router.put("/:id", auth, adminAuth, async (req, res) => {
  try {
    const updateData = req.body

    // Add updated timestamp
    updateData.updatedAt = new Date()

    const community = await Community.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true })

    if (!community) {
      return res.status(404).json({ message: "Community not found" })
    }

    res.json({
      message: "Community updated successfully",
      community,
    })
  } catch (error) {
    console.error("Update community error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Set community chairperson
router.post("/:id/chairperson", auth, adminAuth, async (req, res) => {
  try {
    const { userId } = req.body

    // Find user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Find community
    const community = await Community.findById(req.params.id)
    if (!community) {
      return res.status(404).json({ message: "Community not found" })
    }

    // Update community chairperson
    community.chairperson = {
      userId,
      name: user.name,
      avatar: user.image,
      initials: user.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      email: user.email,
    }

    community.updatedAt = new Date()
    await community.save()

    // Update user's role and communityId
    user.role = "chairperson"
    user.communityId = community._id
    await user.save()

    res.json({
      message: "Chairperson set successfully",
      community,
    })
  } catch (error) {
    console.error("Set chairperson error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get community teams
router.get("/:id/teams", async (req, res) => {
  try {
    const teams = await Team.find({ communityId: req.params.id })
    res.json({ teams })
  } catch (error) {
    console.error("Get community teams error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get community events
router.get("/:id/events", async (req, res) => {
  try {
    const events = await Event.find({ communityId: req.params.id })
    res.json({ events })
  } catch (error) {
    console.error("Get community events error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

