"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const DashboardEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // In a real app, this would be an API call
        // const res = await api.get('/api/events');
        // setEvents(res.data.events);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setEvents([
          {
            id: 1,
            title: "National Hackathon 2025",
            organizer: "Tech University",
            description: "A 48-hour coding competition to solve real-world problems",
            date: "May 15-17, 2025",
            location: "Tech University Campus",
            attendees: 500,
            category: "Hackathon",
            status: "In Progress",
            statusColor: "bg-blue-100 text-blue-800",
            progress: 65,
            image: "https://via.placeholder.com/400x200",
          },
          {
            id: 2,
            title: "AI Workshop Series",
            organizer: "CSI Community",
            description: "Learn about the latest advancements in artificial intelligence",
            date: "June 5-10, 2025",
            location: "Virtual",
            attendees: 300,
            category: "Workshop",
            status: "Planning",
            statusColor: "bg-yellow-100 text-yellow-800",
            progress: 25,
            image: "https://via.placeholder.com/400x200",
          },
          {
            id: 3,
            title: "Leadership Summit",
            organizer: "ISTE",
            description: "Develop leadership skills and network with industry leaders",
            date: "July 20-22, 2025",
            location: "Grand Convention Center",
            attendees: 250,
            category: "Conference",
            status: "Planning",
            statusColor: "bg-yellow-100 text-yellow-800",
            progress: 10,
            image: "https://via.placeholder.com/400x200",
          },
          {
            id: 4,
            title: "Tech Career Fair",
            organizer: "IEEE",
            description: "Connect with top tech companies for internship and job opportunities",
            date: "April 30, 2025",
            location: "University Auditorium",
            attendees: 600,
            category: "Career Fair",
            status: "Almost Complete",
            statusColor: "bg-green-100 text-green-800",
            progress: 90,
            image: "https://via.placeholder.com/400x200",
          },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents =
    activeTab === "all"
      ? events
      : events.filter((event) => {
          if (activeTab === "active") return event.status === "In Progress"
          if (activeTab === "planning") return event.status === "Planning"
          if (activeTab === "completed") return event.status === "Almost Complete" || event.status === "Completed"
          return true
        })

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Manage Events</h3>
        <Link
          to="/events/create"
          className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
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
          Create Event
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex border-b">
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "all" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Events
          </button>
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "active"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active
          </button>
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "planning"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("planning")}
          >
            Planning
          </button>
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "completed"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-48 w-full object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${event.statusColor}`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{event.organizer}</p>
                    <p className="mt-2 text-sm text-gray-700">{event.description.substring(0, 100)}...</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-4 w-4 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-4 w-4 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t p-4">
                    <Link
                      to={`/events/${event.id}`}
                      className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-50"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/events/${event.id}/manage`}
                      className="ml-2 flex-1 rounded-md bg-purple-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-700"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No events found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardEvents

