const express = require("express")
const Task = require("../models/Task")
const { auth, chairpersonAuth } = require("../middleware/auth")
const mongoose = require("mongoose")

const router = express.Router()

// Get tasks with optional filters
router.get("/", auth, async (req, res) => {
  try {
    const { eventId, teamId, status, assignedTo } = req.query

    // Build query based on filters
    const query = {}

    if (eventId) {
      query.eventId = mongoose.Types.ObjectId(eventId)
    }

    if (teamId) {
      query.teamId = mongoose.Types.ObjectId(teamId)
    }

    if (status) {
      query.status = status
    }

    // If assignedTo=me, filter by current user
    if (assignedTo === "me") {
      query.assignedToId = req.user._id
    } else if (assignedTo) {
      query.assignedToId = mongoose.Types.ObjectId(assignedTo)
    }

    // Get tasks
    const tasks = await Task.find(query).sort({ dueDate: 1 })

    res.json({ tasks })
  } catch (error) {
    console.error("Get tasks error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new task
router.post("/", auth, chairpersonAuth, async (req, res) => {
  try {
    const taskData = req.body

    // Validate required fields
    if (!taskData.title || !taskData.eventId || !taskData.teamId) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    // Add timestamps and default values
    const newTask = new Task({
      ...taskData,
      createdBy: req.user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: taskData.status || "Not Started",
      aiAssigned: taskData.aiAssigned || false,
      completed: false,
    })

    await newTask.save()

    res.status(201).json({
      message: "Task created successfully",
      taskId: newTask._id,
      task: newTask,
    })
  } catch (error) {
    console.error("Create task error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const updateData = req.body

    // Add updated timestamp
    updateData.updatedAt = new Date()

    const task = await Task.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json({
      message: "Task updated successfully",
      task,
    })
  } catch (error) {
    console.error("Update task error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Toggle task completion
router.patch("/:id/toggle", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    // Toggle completion status
    task.completed = !task.completed
    task.status = task.completed ? "Completed" : "In Progress"
    task.updatedAt = new Date()

    await task.save()

    res.json({
      message: `Task marked as ${task.completed ? "completed" : "incomplete"}`,
      task,
    })
  } catch (error) {
    console.error("Toggle task error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete task
router.delete("/:id", auth, chairpersonAuth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("Delete task error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

