const express = require("express")
const Event = require("../models/Event")
const Registration = require("../models/Registration")
const { auth, chairpersonAuth } = require("../middleware/auth")
const mongoose = require("mongoose")

const router = express.Router()

// Get all events with optional filters
router.get("/", async (req, res) => {
  try {
    const { category, status, page = 1, limit = 10 } = req.query

    // Build query based on filters
    const query = {}
    if (category) query.category = category
    if (status) query.status = status

    // Get total count for pagination
    const total = await Event.countDocuments(query)

    // Get events with pagination
    const events = await Event.find(query)
      .sort({ startDate: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({
      events,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get events error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    res.json(event)
  } catch (error) {
    console.error("Get event error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new event
router.post("/", auth, chairpersonAuth, async (req, res) => {
  try {
    const eventData = req.body

    // Add timestamps and default values
    const newEvent = new Event({
      ...eventData,
      createdBy: req.user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: eventData.status || "Draft",
      attendees: {
        registered: 0,
        expected: eventData.attendees?.expected || 0,
        capacity: eventData.attendees?.capacity || 0,
      },
    })

    await newEvent.save()

    res.status(201).json({
      message: "Event created successfully",
      eventId: newEvent._id,
      event: newEvent,
    })
  } catch (error) {
    console.error("Create event error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update event
router.put("/:id", auth, chairpersonAuth, async (req, res) => {
  try {
    const updateData = req.body

    // Add updated timestamp
    updateData.updatedAt = new Date()

    const event = await Event.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true })

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    res.json({
      message: "Event updated successfully",
      event,
    })
  } catch (error) {
    console.error("Update event error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete event
router.delete("/:id", auth, chairpersonAuth, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    // Delete all registrations for this event
    await Registration.deleteMany({ eventId: req.params.id })

    res.json({ message: "Event deleted successfully" })
  } catch (error) {
    console.error("Delete event error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Register for an event
router.post("/:id/register", auth, async (req, res) => {
  try {
    const eventId = req.params.id
    const userId = req.user._id

    // Check if event exists
    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    // Check if registration is open
    if (event.status !== "Registration Open") {
      return res.status(400).json({ message: "Registration is not open for this event" })
    }

    // Check if user is already registered
    const existingRegistration = await Registration.findOne({
      eventId,
      userId,
    })

    if (existingRegistration) {
      return res.status(400).json({ message: "You are already registered for this event" })
    }

    // Check if event is at capacity
    if (event.attendees.registered >= event.attendees.capacity) {
      return res.status(400).json({ message: "This event has reached its capacity" })
    }

    // Create registration
    const registration = new Registration({
      eventId,
      userId,
      registeredAt: new Date(),
      status: "Confirmed",
    })

    await registration.save()

    // Update event attendee count
    await Event.findByIdAndUpdate(eventId, { $inc: { "attendees.registered": 1 } })

    res.status(201).json({
      message: "Registration successful",
      registration,
    })
  } catch (error) {
    console.error("Event registration error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Cancel registration
router.delete("/:id/register", auth, async (req, res) => {
  try {
    const eventId = req.params.id
    const userId = req.user._id

    // Delete registration
    const registration = await Registration.findOneAndDelete({
      eventId,
      userId,
    })

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" })
    }

    // Update event attendee count
    await Event.findByIdAndUpdate(eventId, { $inc: { "attendees.registered": -1 } })

    res.json({ message: "Registration cancelled successfully" })
  } catch (error) {
    console.error("Cancel registration error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

