"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    collegeKey: "",
    communityId: "",
    teamId: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { login, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Add role to form data based on active tab
      const loginData = {
        email: formData.email,
        password: formData.password,
        role: activeTab === "general" ? "attendee" : activeTab,
      }

      await login(loginData)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex min-h-screen items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-500">Enter your credentials to sign in to your account</p>
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
                {activeTab === "general" && "Attendee Login"}
                {activeTab === "admin" && "Admin Login"}
                {activeTab === "chairperson" && "Chairperson Login"}
                {activeTab === "member" && "Member Login"}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {activeTab === "general" && "Login to register for events and track your participation"}
                {activeTab === "admin" && "Login with your college admin credentials"}
                {activeTab === "chairperson" && "Login to manage your community and events"}
                {activeTab === "member" && "Login to view your assigned tasks and team activities"}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

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

            {activeTab === "admin" && (
              <div className="space-y-2">
                <label htmlFor="collegeKey" className="text-sm font-medium">
                  College Identity Key
                </label>
                <input
                  id="collegeKey"
                  name="collegeKey"
                  type="password"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.collegeKey}
                  onChange={handleChange}
                />
              </div>
            )}

            {activeTab === "chairperson" && (
              <div className="space-y-2">
                <label htmlFor="communityId" className="text-sm font-medium">
                  Community ID
                </label>
                <input
                  id="communityId"
                  name="communityId"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.communityId}
                  onChange={handleChange}
                />
              </div>
            )}

            {activeTab === "member" && (
              <div className="space-y-2">
                <label htmlFor="teamId" className="text-sm font-medium">
                  Team ID
                </label>
                <input
                  id="teamId"
                  name="teamId"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.teamId}
                  onChange={handleChange}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-purple-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

