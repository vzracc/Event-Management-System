const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: String,
  mode: {
    type: String,
    enum: ["in-person", "virtual", "hybrid"],
    default: "in-person",
  },
  category: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  status: {
    type: String,
    enum: ["Draft", "Planning", "Registration Open", "In Progress", "Completed", "Cancelled"],
    default: "Draft",
  },
  attendees: {
    registered: {
      type: Number,
      default: 0,
    },
    expected: {
      type: Number,
      default: 0,
    },
    capacity: {
      type: Number,
      default: 0,
    },
  },
  image: String,
  schedule: [
    {
      day: String,
      items: [
        {
          time: String,
          title: String,
        },
      ],
    },
  ],
  sponsors: [
    {
      name: String,
      logo: String,
      tier: String,
    },
  ],
  prizes: [
    {
      position: String,
      prize: String,
    },
  ],
  requirements: [String],
  faqs: [
    {
      question: String,
      answer: String,
    },
  ],
  organizers: [
    {
      name: String,
      role: String,
      avatar: String,
      initials: String,
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Event", eventSchema)

