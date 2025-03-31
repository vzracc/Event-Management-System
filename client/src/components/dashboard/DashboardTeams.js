"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const DashboardTeams = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all-teams")
  const [communities, setCommunities] = useState([])
  const [activeCommunity, setActiveCommunity] = useState("csi")

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // In a real app, this would be an API call
        // const res = await api.get('/api/teams');
        // setTeams(res.data.teams);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setTeams([
          {
            id: 1,
            name: "PR Team",
            community: "CSI",
            description: "Handles public relations and marketing for events",
            members: [
              { name: "Jamie Lee", avatar: "https://via.placeholder.com/32", initials: "JL", role: "Team Lead" },
              {
                name: "Morgan Chen",
                avatar: "https://via.placeholder.com/32",
                initials: "MC",
                role: "Social Media Manager",
              },
              { name: "Riley Kim", avatar: "https://via.placeholder.com/32", initials: "RK", role: "Content Creator" },
            ],
            tasks: { total: 24, completed: 18, overdue: 2 },
            events: ["National Hackathon 2025", "Leadership Summit"],
          },
          {
            id: 2,
            name: "Technical Team",
            community: "CSI",
            description: "Manages technical aspects of events including websites and systems",
            members: [
              { name: "Sam Wilson", avatar: "https://via.placeholder.com/32", initials: "SW", role: "Team Lead" },
              {
                name: "Jordan Patel",
                avatar: "https://via.placeholder.com/32",
                initials: "JP",
                role: "Backend Developer",
              },
              {
                name: "Casey Zhang",
                avatar: "https://via.placeholder.com/32",
                initials: "CZ",
                role: "Frontend Developer",
              },
              {
                name: "Taylor Brown",
                avatar: "https://via.placeholder.com/32",
                initials: "TB",
                role: "System Administrator",
              },
            ],
            tasks: { total: 32, completed: 25, overdue: 1 },
            events: ["National Hackathon 2025", "AI Workshop Series"],
          },
          {
            id: 3,
            name: "Creative Team",
            community: "ISTE",
            description: "Creates visual content and designs for events",
            members: [
              { name: "Alex Johnson", avatar: "https://via.placeholder.com/32", initials: "AJ", role: "Team Lead" },
              {
                name: "Quinn Martinez",
                avatar: "https://via.placeholder.com/32",
                initials: "QM",
                role: "Graphic Designer",
              },
              {
                name: "Avery Williams",
                avatar: "https://via.placeholder.com/32",
                initials: "AW",
                role: "UI/UX Designer",
              },
            ],
            tasks: { total: 18, completed: 12, overdue: 3 },
            events: ["National Hackathon 2025", "Leadership Summit"],
          },
          {
            id: 4,
            name: "Logistics Team",
            community: "TSDW",
            description: "Handles venue arrangements, equipment, and other logistics",
            members: [
              { name: "Taylor Smith", avatar: "https://via.placeholder.com/32", initials: "TS", role: "Team Lead" },
              {
                name: "Jordan Lee",
                avatar: "https://via.placeholder.com/32",
                initials: "JL",
                role: "Venue Coordinator",
              },
              {
                name: "Reese Garcia",
                avatar: "https://via.placeholder.com/32",
                initials: "RG",
                role: "Equipment Manager",
              },
            ],
            tasks: { total: 15, completed: 10, overdue: 0 },
            events: ["Tech Career Fair", "Leadership Summit"],
          },
        ])

        setCommunities(["CSI", "ISTE", "TSDW", "IEEE"])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching teams:", error)
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  const filteredTeams =
    activeTab === "all-teams"
      ? teams
      : activeTab === "my-teams"
        ? teams.filter((team) => team.members.some((member) => member.name === "Alex Johnson")) // Simulating current user
        : teams.filter((team) => team.community.toLowerCase() === activeCommunity)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading teams...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Team Management</h3>
        <button className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Create Team
        </button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex border-b">
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "all-teams"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("all-teams")}
          >
            All Teams
          </button>
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "my-teams"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("my-teams")}
          >
            My Teams
          </button>
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "by-community"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("by-community")}
          >
            By Community
          </button>
        </div>

        <div className="p-6">
          {activeTab === "by-community" && (
            <div className="mb-6">
              <div className="flex border-b">
                {communities.map((community) => (
                  <button
                    key={community}
                    className={`flex-1 px-4 py-2 text-center text-sm font-medium ${
                      activeCommunity === community.toLowerCase()
                        ? "border-b-2 border-purple-600 text-purple-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveCommunity(community.toLowerCase())}
                  >
                    {community}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => (
                <div key={team.id} className="rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{team.name}</h3>
                        <p className="text-sm text-gray-500">{team.community} Community</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1 h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        {team.members.length} Members
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-700">{team.description}</p>

                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Team Members</h4>
                        <div className="flex flex-wrap gap-2">
                          {team.members.map((member) => (
                            <div
                              key={member.name}
                              className="flex items-center space-x-2 rounded-full bg-gray-100 px-3 py-1"
                            >
                              <img
                                src={member.avatar || "/placeholder.svg"}
                                alt={member.name}
                                className="h-6 w-6 rounded-full"
                              />
                              <span className="text-xs">{member.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">Task Progress</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-green-600">{team.tasks.completed} completed</span>
                            {team.tasks.overdue > 0 && (
                              <span className="flex items-center text-xs text-red-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-1 h-3 w-3"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="8" x2="12" y2="12"></line>
                                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                {team.tasks.overdue} overdue
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div
                            className="h-2 rounded-full bg-purple-600"
                            style={{ width: `${(team.tasks.completed / team.tasks.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Assigned Events</h4>
                        <div className="flex flex-wrap gap-2">
                          {team.events.map((event) => (
                            <span
                              key={event}
                              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                            >
                              {event}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t p-4">
                    <Link
                      to={`/teams/${team.id}`}
                      className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-50"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/teams/${team.id}/manage`}
                      className="ml-2 flex-1 rounded-md bg-purple-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-700"
                    >
                      Manage Team
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500">No teams found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardTeams

