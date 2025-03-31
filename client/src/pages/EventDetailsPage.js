"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const EventDetailsPage = () => {
  const { id } = useParams()
  const { isAuthenticated, user } = useContext(AuthContext)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [registering, setRegistering] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // In a real app, this would be an API call
        // const res = await api.get(`/api/events/${id}`);
        // setEvent(res.data);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setEvent({
          id,
          title: "National Hackathon 2025",
          organizer: "Tech University",
          description:
            "A 48-hour coding competition to solve real-world problems. Join us for an exciting weekend of innovation, collaboration, and problem-solving. Teams will compete to develop solutions for real-world challenges provided by our industry partners. Prizes include cash awards, internship opportunities, and mentorship from leading tech companies.",
          date: "May 15-17, 2025",
          time: "9:00 AM - 6:00 PM",
          location: "Tech University Campus",
          address: "123 University Ave, Tech City, TC 12345",
          mode: "In-Person",
          attendees: {
            registered: 342,
            expected: 500,
            capacity: 600,
          },
          category: "Hackathon",
          status: "Registration Open",
          statusColor: "bg-green-100 text-green-800",
          progress: 65,
          image: "https://via.placeholder.com/800x400",
          teams: [
            { name: "PR Team", members: 3, tasks: { total: 12, completed: 8 } },
            { name: "Technical Team", members: 4, tasks: { total: 15, completed: 10 } },
            { name: "Creative Team", members: 3, tasks: { total: 10, completed: 6 } },
            { name: "Logistics Team", members: 3, tasks: { total: 8, completed: 5 } },
          ],
          schedule: [
            {
              day: "Day 1 - May 15",
              items: [
                { time: "9:00 AM - 10:00 AM", title: "Registration & Check-in" },
                { time: "10:00 AM - 11:00 AM", title: "Opening Ceremony" },
                { time: "11:00 AM - 12:00 PM", title: "Problem Statement Announcement" },
                { time: "12:00 PM - 1:00 PM", title: "Lunch Break" },
                { time: "1:00 PM - 6:00 PM", title: "Hacking Begins" },
              ],
            },
            {
              day: "Day 2 - May 16",
              items: [
                { time: "9:00 AM - 12:00 PM", title: "Continued Hacking" },
                { time: "12:00 PM - 1:00 PM", title: "Lunch Break" },
                { time: "1:00 PM - 5:00 PM", title: "Mentor Sessions" },
                { time: "5:00 PM - 6:00 PM", title: "Progress Check-in" },
              ],
            },
            {
              day: "Day 3 - May 17",
              items: [
                { time: "9:00 AM - 12:00 PM", title: "Final Hacking Hours" },
                { time: "12:00 PM - 1:00 PM", title: "Lunch Break" },
                { time: "1:00 PM - 3:00 PM", title: "Project Submissions" },
                { time: "3:00 PM - 5:00 PM", title: "Judging & Evaluations" },
                { time: "5:00 PM - 6:00 PM", title: "Closing Ceremony & Awards" },
              ],
            },
          ],
          sponsors: [
            { name: "TechCorp", logo: "https://via.placeholder.com/80", tier: "Platinum" },
            { name: "InnovateSoft", logo: "https://via.placeholder.com/80", tier: "Gold" },
            { name: "DevWorks", logo: "https://via.placeholder.com/80", tier: "Gold" },
            { name: "CodeLabs", logo: "https://via.placeholder.com/80", tier: "Silver" },
          ],
          prizes: [
            { position: "1st Place", prize: "$5,000 + Internship Opportunities" },
            { position: "2nd Place", prize: "$3,000 + Mentorship Program" },
            { position: "3rd Place", prize: "$1,500" },
            { position: "Best UI/UX", prize: "$1,000" },
            { position: "Most Innovative", prize: "$1,000" },
          ],
          requirements: [
            "Laptop with necessary development tools",
            "Student ID for verification",
            "Team of 2-4 members",
            "Preliminary project idea (optional)",
          ],
          faqs: [
            {
              question: "Can I participate as an individual?",
              answer:
                "We encourage team participation, but individuals can also register and we'll help match you with a team.",
            },
            {
              question: "Is there an age restriction?",
              answer: "Participants must be at least 18 years old or enrolled in a college/university.",
            },
            {
              question: "Will food be provided?",
              answer: "Yes, meals and snacks will be provided throughout the event.",
            },
            {
              question: "Can I work on a pre-existing project?",
              answer: "No, all projects must be started from scratch during the hackathon.",
            },
          ],
          organizers: [
            {
              name: "Dr. Jane Smith",
              role: "Event Director",
              avatar: "https://via.placeholder.com/40",
              initials: "JS",
            },
            {
              name: "Prof. Michael Johnson",
              role: "Technical Advisor",
              avatar: "https://via.placeholder.com/40",
              initials: "MJ",
            },
            {
              name: "Sarah Williams",
              role: "Logistics Coordinator",
              avatar: "https://via.placeholder.com/40",
              initials: "SW",
            },
          ],
        })

        // Check if user is registered (in a real app, this would be an API call)
        setIsRegistered(false)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching event:", error)
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  const handleRegister = async () => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = `/login?redirect=/events/${id}`
      return
    }

    setRegistering(true)
    try {
      // In a real app, this would be an API call
      // await api.post(`/api/events/${id}/register`);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsRegistered(true)

      // Update attendee count
      setEvent((prev) => ({
        ...prev,
        attendees: {
          ...prev.attendees,
          registered: prev.attendees.registered + 1,
        },
      }))
    } catch (error) {
      console.error("Error registering for event:", error)
    } finally {
      setRegistering(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading event details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative rounded-xl overflow-hidden">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-[300px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 self-start ${event.statusColor}`}
              >
                {event.status}
              </span>
              <h1 className="text-3xl font-bold text-white">{event.title}</h1>
              <p className="text-white/80">Organized by {event.organizer}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
            <div className="flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center space-x-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
            <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
              <span>
                {event.attendees.registered} / {event.attendees.expected} Registered
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex border-b">
              <button
                className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
                  activeTab === "overview"
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
                  activeTab === "schedule"
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("schedule")}
              >
                Schedule
              </button>
              <button
                className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
                  activeTab === "prizes"
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("prizes")}
              >
                Prizes
              </button>
              <button
                className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
                  activeTab === "faqs"
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("faqs")}
              >
                FAQs
              </button>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">About This Event</h2>
                    <p className="text-gray-700 whitespace-pre-line">{event.description}</p>

                    <div className="mt-6 space-y-4">
                      <h3 className="font-semibold text-lg">Event Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-purple-600 mt-0.5"
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
                          <div>
                            <h4 className="font-medium">Date</h4>
                            <p className="text-gray-500">{event.date}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-purple-600 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <div>
                            <h4 className="font-medium">Time</h4>
                            <p className="text-gray-500">{event.time}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-purple-600 mt-0.5"
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
                          <div>
                            <h4 className="font-medium">Location</h4>
                            <p className="text-gray-500">{event.location}</p>
                            <p className="text-gray-500 text-sm">{event.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-purple-600 mt-0.5"
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
                          <div>
                            <h4 className="font-medium">Capacity</h4>
                            <p className="text-gray-500">
                              {event.attendees.registered} registered of {event.attendees.capacity} capacity
                            </p>
                            <div className="h-2 w-full rounded-full bg-gray-100 mt-2">
                              <div
                                className="h-2 rounded-full bg-purple-600"
                                style={{ width: `${(event.attendees.registered / event.attendees.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <h3 className="font-semibold text-lg">Requirements</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-500">
                        {event.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 space-y-4">
                      <h3 className="font-semibold text-lg">Organizers</h3>
                      <div className="flex flex-wrap gap-4">
                        {event.organizers.map((organizer, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                              <img
                                src={organizer.avatar || "/placeholder.svg"}
                                alt={organizer.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{organizer.name}</p>
                              <p className="text-xs text-gray-500">{organizer.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-4">Sponsors</h2>
                    <div className="space-y-6">
                      {["Platinum", "Gold", "Silver"].map((tier) => {
                        const tierSponsors = event.sponsors.filter((s) => s.tier === tier)
                        if (tierSponsors.length === 0) return null

                        return (
                          <div key={tier} className="space-y-3">
                            <h3 className="font-medium text-sm text-gray-500">{tier} Sponsors</h3>
                            <div className="flex flex-wrap gap-6 items-center">
                              {tierSponsors.map((sponsor, index) => (
                                <div key={index} className="text-center">
                                  <img
                                    src={sponsor.logo || "/placeholder.svg"}
                                    alt={sponsor.name}
                                    className="h-16 w-16 object-contain mx-auto"
                                  />
                                  <p className="mt-2 text-sm font-medium">{sponsor.name}</p>
                                </div>
                              ))}
                            </div>
                            {tier !== "Silver" && <hr className="my-4 border-gray-200" />}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "schedule" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Event Schedule</h2>
                  <p className="text-gray-500 mb-6">Detailed schedule for all days of the event</p>

                  <div className="space-y-8">
                    {event.schedule.map((day, dayIndex) => (
                      <div key={dayIndex} className="space-y-4">
                        <h3 className="font-semibold text-lg text-purple-600">{day.day}</h3>
                        <div className="space-y-4">
                          {day.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex">
                              <div className="mr-4 flex flex-col items-center">
                                <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                                {itemIndex < day.items.length - 1 && <div className="h-full w-0.5 bg-gray-200"></div>}
                              </div>
                              <div className="pb-5">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-center">
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download Schedule
                  </button>
                </div>
              )}

              {activeTab === "prizes" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Prizes & Awards</h2>
                  <p className="text-gray-500 mb-6">What you can win at this event</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.prizes.map((prize, index) => (
                      <div key={index} className="rounded-lg border border-gray-200 p-4">
                        <h3 className="font-semibold text-lg">{prize.position}</h3>
                        <p className="text-gray-500">{prize.prize}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "faqs" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>

                  <div className="space-y-4">
                    {event.faqs.map((faq, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-semibold">{faq.question}</h3>
                        <p className="text-gray-500">{faq.answer}</p>
                        {index < event.faqs.length - 1 && <hr className="my-4 border-gray-200" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-purple-200 bg-white">
            <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
              <h2 className="text-xl font-bold text-purple-800">Registration</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Registration Status:</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${event.statusColor}`}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Registered:</span>
                  <span>
                    {event.attendees.registered} / {event.attendees.expected}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-purple-600"
                    style={{ width: `${(event.attendees.registered / event.attendees.expected) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500">
                  <p className="flex items-center">
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
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Registration closes on May 10, 2025
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col space-y-3">
              {isRegistered ? (
                <div className="w-full rounded-md bg-green-50 p-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">You're registered!</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Check your email for confirmation details and updates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  className="w-full rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-4 py-2 text-sm font-medium text-white"
                  onClick={handleRegister}
                  disabled={registering}
                >
                  {registering ? "Processing..." : "Register Now"}
                </button>
              )}
              <div className="flex w-full justify-between">
                <button
                  className="rounded-md border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <Link
                  to={`/events/${event.id}/chat`}
                  className="rounded-md border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </Link>
                <button className="rounded-md border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">Event Teams</h2>
              <p className="text-sm text-gray-500">Teams working on this event</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {event.teams.map((team, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{team.name}</span>
                      <span className="text-sm text-gray-500">{team.members} members</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Task completion:</span>
                      <span>
                        {team.tasks.completed}/{team.tasks.total} tasks
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-purple-600"
                        style={{ width: `${(team.tasks.completed / team.tasks.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">Need Help?</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <p className="text-gray-500">
                  Have questions about this event? Contact the organizers or check the FAQs.
                </p>
                <Link
                  to={`/events/${event.id}/contact`}
                  className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Contact Organizers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage

