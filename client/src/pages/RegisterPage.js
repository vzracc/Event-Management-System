"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import api from "../api/api"

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    college: "",
    collegeId: "",
    position: "",
    community: "",
    team: "",
    role: "attendee",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [communities, setCommunities] = useState([])
  const [teams, setTeams] = useState([])

  const { register, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  // Fetch communities and teams
  useEffect(() => {
    const fetchData = async () => {
      try {
        const communitiesRes = await api.get("/api/communities")
        setCommunities(communitiesRes.data.communities || [])

        if (formData.community) {
          const teamsRes = await api.get(`/api/communities/${formData.community}/teams`)
          setTeams(teamsRes.data.teams || [])
        }
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    }

    fetchData()
  }, [formData.community])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCommunityChange = async (e) => {
    const communityId = e.target.value
    setFormData({ ...formData, community: communityId })

    if (communityId) {
      try {
        const res = await api.get(`/api/communities/${communityId}/teams`)
        setTeams(res.data.teams || [])
      } catch (err) {
        console.error("Error fetching teams:", err)
      }
    } else {
      setTeams([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Set role based on active tab
      const registerData = {
        ...formData,
        role: activeTab === "general" ? "attendee" : activeTab,
      }

      await register(registerData)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex min-h-screen items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-lg space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500">Register to access the event management platform</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex rounded-t-lg border-b">
            <button
              className={`flex-1 rounded-tl-lg px-4 py-3 text-center text-sm font-medium ${
                activeTab === "general" ? "bg-purple-50 text-purple-700" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("general")}
            >
              General
            </button>
            <button
              className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
                activeTab === "admin" ? "bg-purple-50 text-purple-700" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </button>
            <button
              className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
                activeTab === "chairperson"
                  ? "bg-purple-50 text-purple-700"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("chairperson")}
            >
              Chair
            </button>
            <button
              className={`flex-1 rounded-tr-lg px-4 py-3 text-center text-sm font-medium ${
                activeTab === "member" ? "bg-purple-50 text-purple-700" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("member")}
            >
              Member
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {activeTab === "general" && "Attendee Registration"}
                {activeTab === "admin" && "Admin Registration"}
                {activeTab === "chairperson" && "Chairperson Registration"}
                {activeTab === "member" && "Member Registration"}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {activeTab === "general" && "Register to participate in events and competitions"}
                {activeTab === "admin" && "Register as a college administrator"}
                {activeTab === "chairperson" && "Register as a community chairperson"}
                {activeTab === "member" && "Register as a community team member"}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="college" className="text-sm font-medium">
                College/University
              </label>
              <input
                id="college"
                name="college"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.college}
                onChange={handleChange}
              />
            </div>

            {activeTab === "admin" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="collegeId" className="text-sm font-medium">
                    College ID/Registration Number
                  </label>
                  <input
                    id="collegeId"
                    name="collegeId"
                    type="text"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.collegeId}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="position" className="text-sm font-medium">
                    Position
                  </label>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    placeholder="e.g., Dean, Director, etc."
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {(activeTab === "chairperson" || activeTab === "member") && (
              <div className="space-y-2">
                <label htmlFor="community" className="text-sm font-medium">
                  Community
                </label>
                <select
                  id="community"
                  name="community"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.community}
                  onChange={handleCommunityChange}
                >
                  <option value="">Select community</option>
                  {communities.map((community) => (
                    <option key={community._id} value={community._id}>
                      {community.name} - {community.fullName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {activeTab === "member" && (
              <div className="space-y-2">
                <label htmlFor="team" className="text-sm font-medium">
                  Team
                </label>
                <select
                  id="team"
                  name="team"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.team}
                  onChange={handleChange}
                  disabled={!formData.community}
                >
                  <option value="">Select team</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-purple-600 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

