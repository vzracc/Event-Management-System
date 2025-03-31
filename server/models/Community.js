const mongoose = require("mongoose")

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  description: String,
  logo: String,
  coverImage: String,
  established: String,
  college: {
    type: String,
    required: true,
  },
  website: String,
  email: String,
  socialMedia: {
    instagram: String,
    twitter: String,
    linkedin: String,
  },
  chairperson: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    avatar: String,
    initials: String,
    email: String,
  },
  achievements: [String],
  members: {
    total: {
      type: Number,
      default: 0,
    },
    active: {
      type: Number,
      default: 0,
    },
    leadership: {
      type: Number,
      default: 0,
    },
  },
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

module.exports = mongoose.model("Community", communitySchema)

