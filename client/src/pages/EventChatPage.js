"use client"

import { useState, useEffect, useRef, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const EventChatPage = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [event, setEvent] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [askingAI, setAskingAI] = useState(false)
  const [aiQuestion, setAIQuestion] = useState("")
  const [aiLoading, setAILoading] = useState(false)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // In a real app, these would be API calls
        // const eventRes = await api.get(`/api/events/${id}`);
        // const messagesRes = await api.get(`/api/events/${id}/chat`);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setEvent({
          id,
          title: "National Hackathon 2025",
          organizer: "Tech University",
          date: "May 15-17, 2025",
          image: "https://via.placeholder.com/800x400",
        })

        setMessages([
          {
            id: 1,
            sender: {
              id: "admin1",
              name: "Dr. Jane Smith",
              role: "Event Director",
              avatar: "https://via.placeholder.com/40",
            },
            content:
              "Welcome to the National Hackathon 2025 chat! This is where you can ask questions and get updates about the event.",
            timestamp: "2025-04-01T10:00:00Z",
            isAdmin: true,
          },
          {
            id: 2,
            sender: {
              id: "admin2",
              name: "Prof. Michael Johnson",
              role: "Technical Advisor",
              avatar: "https://via.placeholder.com/40",
            },
            content:
              'The theme for this year\'s hackathon is "Sustainable Technology Solutions". Start brainstorming ideas!',
            timestamp: "2025-04-01T10:05:00Z",
            isAdmin: true,
          },
          {
            id: 3,
            sender: { id: "user1", name: "Alex Chen", avatar: "https://via.placeholder.com/40" },
            content: "Will there be any pre-hackathon workshops?",
            timestamp: "2025-04-01T10:10:00Z",
            isAdmin: false,
          },
          {
            id: 4,
            sender: {
              id: "admin1",
              name: "Dr. Jane Smith",
              role: "Event Director",
              avatar: "https://via.placeholder.com/40",
            },
            content:
              "Yes, we'll be hosting a series of workshops in the week leading up to the hackathon. Topics will include AI, blockchain, and sustainable design principles.",
            timestamp: "2025-04-01T10:15:00Z",
            isAdmin: true,
          },
          {
            id: 5,
            sender: { id: "user2", name: "Jordan Lee", avatar: "https://via.placeholder.com/40" },
            content: "What's the maximum team size?",
            timestamp: "2025-04-01T10:20:00Z",
            isAdmin: false,
          },
          {
            id: 6,
            sender: {
              id: "admin2",
              name: "Prof. Michael Johnson",
              role: "Technical Advisor",
              avatar: "https://via.placeholder.com/40",
            },
            content: "Teams can have 2-4 members. We encourage diverse teams with different skill sets!",
            timestamp: "2025-04-01T10:25:00Z",
            isAdmin: true,
          },
          {
            id: 7,
            sender: { id: "ai", name: "Event Assistant AI", avatar: "https://via.placeholder.com/40" },
            content:
              "Just a reminder that registration closes on May 10, 2025. Make sure to register your team before then!",
            timestamp: "2025-04-01T10:30:00Z",
            isAI: true,
          },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching event data:", error)
        setError("Failed to load event data. Please try again.")
        setLoading(false)
      }
    }

    fetchEventData()
  }, [id])

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    try {
      // In a real app, this would be an API call
      // await api.post(`/api/events/${id}/chat`, { content: newMessage });

      // Add message to the list
      const messageToAdd = {
        id: Date.now(),
        sender: {
          id: user?.id || "current-user",
          name: user?.name || "You",
          avatar: user?.avatar || "https://via.placeholder.com/40",
        },
        content: newMessage,
        timestamp: new Date().toISOString(),
        isAdmin: false,
      }

      setMessages([...messages, messageToAdd])
      setNewMessage("")

      // Simulate admin response after a delay
      if (Math.random() > 0.5) {
        setTimeout(() => {
          const adminResponse = {
            id: Date.now() + 1,
            sender: {
              id: "admin1",
              name: "Dr. Jane Smith",
              role: "Event Director",
              avatar: "https://via.placeholder.com/40",
            },
            content: `Thank you for your message! The organizing team will get back to you soon.`,
            timestamp: new Date().toISOString(),
            isAdmin: true,
          }

          setMessages((prev) => [...prev, adminResponse])
        }, 2000)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setError("Failed to send message. Please try again.")
    }
  }

  const handleAskAI = async (e) => {
    e.preventDefault()

    if (!aiQuestion.trim()) return

    setAILoading(true)

    try {
      // In a real app, this would be an API call
      // const res = await api.post(`/api/ai/chatbot`, {
      //   eventId: id,
      //   question: aiQuestion
      // });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add user question to the list
      const questionToAdd = {
        id: Date.now(),
        sender: {
          id: user?.id || "current-user",
          name: user?.name || "You",
          avatar: user?.avatar || "https://via.placeholder.com/40",
        },
        content: aiQuestion,
        timestamp: new Date().toISOString(),
        isAdmin: false,
      }

      // Add AI response to the list
      const aiResponse = {
        id: Date.now() + 1,
        sender: {
          id: "ai",
          name: "Event Assistant AI",
          avatar: "https://via.placeholder.com/40",
        },
        content: getAIResponse(aiQuestion),
        timestamp: new Date().toISOString(),
        isAI: true,
      }

      setMessages((prev) => [...prev, questionToAdd, aiResponse])
      setAIQuestion("")
      setAskingAI(false)
      setAILoading(false)
    } catch (error) {
      console.error("Error asking AI:", error)
      setError("Failed to get AI response. Please try again.")
      setAILoading(false)
    }
  }

  // Mock AI response generator
  const getAIResponse = (question) => {
    const questionLower = question.toLowerCase()

    if (questionLower.includes("registration") || questionLower.includes("sign up")) {
      return "Registration for the National Hackathon 2025 is open until May 10, 2025. You can register your team through the event page. Each team should have 2-4 members."
    } else if (questionLower.includes("prize") || questionLower.includes("award")) {
      return "The prizes for the National Hackathon 2025 include: 1st Place - $5,000 + Internship Opportunities, 2nd Place - $3,000 + Mentorship Program, 3rd Place - $1,500, Best UI/UX - $1,000, and Most Innovative - $1,000."
    } else if (questionLower.includes("schedule") || questionLower.includes("agenda")) {
      return "The hackathon will run from May 15-17, 2025. Day 1 includes registration, opening ceremony, and problem statement announcement. Day 2 is for continued hacking and mentor sessions. Day 3 includes final submissions, judging, and the closing ceremony."
    } else if (questionLower.includes("location") || questionLower.includes("venue")) {
      return "The National Hackathon 2025 will be held at the Tech University Campus, located at 123 University Ave, Tech City, TC 12345."
    } else if (questionLower.includes("team") || questionLower.includes("group")) {
      return "Teams should consist of 2-4 members. You can register as an individual, and we'll help match you with a team, or you can form your own team before registration."
    } else if (questionLower.includes("food") || questionLower.includes("meal")) {
      return "Yes, meals and snacks will be provided throughout the event. We'll accommodate dietary restrictions - please indicate any special requirements during registration."
    } else if (questionLower.includes("bring") || questionLower.includes("requirement")) {
      return "You should bring your laptop with necessary development tools, student ID for verification, and any personal items you might need. If you're participating as a team, make sure all team members are registered."
    } else {
      return "Thank you for your question! The event organizers will provide more information soon. In the meantime, you can check the event details page for the most up-to-date information."
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading chat...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to={`/events/${id}`}
              className="mr-4 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{event.title} - Chat</h1>
              <p className="text-gray-500">{event.date}</p>
            </div>
          </div>
          <button
            onClick={() => setAskingAI(!askingAI)}
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
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Ask AI Assistant
          </button>
        </div>

        {askingAI && (
          <div className="mb-6 rounded-lg border border-purple-200 bg-purple-50 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-purple-800">Event Assistant AI</h3>
                <div className="mt-2 text-sm text-purple-700">
                  <p>
                    Ask me any questions about the event! I can provide information about registration, schedule, venue,
                    requirements, and more.
                  </p>
                </div>
                <form onSubmit={handleAskAI} className="mt-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAIQuestion(e.target.value)}
                      placeholder="e.g., What's the registration deadline?"
                      className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={aiLoading}
                    />
                    <button
                      type="submit"
                      disabled={aiLoading}
                      className="inline-flex items-center rounded-r-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                    >
                      {aiLoading ? (
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        "Ask"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="h-[500px] overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.id === (user?.id || "current-user") ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] ${message.sender.id === (user?.id || "current-user") ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={message.sender.avatar || "/placeholder.svg"}
                          alt={message.sender.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div
                      className={`mx-2 rounded-lg px-4 py-2 ${
                        message.isAI
                          ? "bg-purple-100 text-purple-800"
                          : message.isAdmin
                            ? "bg-blue-100 text-blue-800"
                            : message.sender.id === (user?.id || "current-user")
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span className="font-medium">{message.sender.name}</span>
                          {message.isAdmin && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                              {message.sender.role}
                            </span>
                          )}
                          {message.isAI && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700">
                              AI
                            </span>
                          )}
                        </div>
                        <p
                          className={`mt-1 text-sm ${
                            message.sender.id === (user?.id || "current-user") && !message.isAI && !message.isAdmin
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          {message.content}
                        </p>
                        <span
                          className={`mt-1 text-xs ${
                            message.sender.id === (user?.id || "current-user") && !message.isAI && !message.isAdmin
                              ? "text-white/70"
                              : "text-gray-500"
                          }`}
                        >
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="inline-flex items-center rounded-r-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventChatPage

