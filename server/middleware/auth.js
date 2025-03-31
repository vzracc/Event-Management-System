const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "Authentication required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" })
  }
}

// Middleware to check if user has admin role
const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403).json({ message: "Access denied. Admin privileges required." })
  }
}

// Middleware to check if user has chairperson role
const chairpersonAuth = (req, res, next) => {
  if (req.user && (req.user.role === "chairperson" || req.user.role === "admin")) {
    next()
  } else {
    res.status(403).json({ message: "Access denied. Chairperson privileges required." })
  }
}

module.exports = { auth, adminAuth, chairpersonAuth }

