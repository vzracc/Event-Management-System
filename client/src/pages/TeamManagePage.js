"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const TeamManagePage = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [team, setTeam] = useState(null)
  const [members, setMembers] = useState([])
  const [tasks, setTasks] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [activeTab, setActiveTab] = useState("members")
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showAITaskModal, setShowAITaskModal] = useState(false)

  const [newMember, setNewMember] = useState({ email: "", role: "" })
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    assignedTo: "",
    event: "",
  })
  const [aiTaskInput, setAITaskInput] = useState("")
  const [aiTaskLoading, setAITaskLoading] = useState(false)
  const [aiTaskResult, setAITaskResult] = useState(null)

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // In a real app, these would be API calls
        // const teamRes = await api.get(`/api/teams/${id}`);
        // const membersRes = await api.get(`/api/teams/${id}/members`);
        // const tasksRes = await api.get(`/api/teams/${id}/tasks`);
        // const eventsRes = await api.get(`/api/teams/${id}/events`);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setTeam({
          id,
          name: "Technical Team",
          community: "CSI",
          description: "Manages technical aspects of events including websites and systems",
          createdAt: "2024-01-15",
          leadId: "user123",
        })

        setMembers([
          {
            id: "user123",
            name: "Sam Wilson",
            email: "sam@example.com",
            role: "Team Lead",
            avatar: "https://via.placeholder.com/40",
            initials: "SW",
            joinedAt: "2024-01-15",
          },
          {
            id: "user124",
            name: "Jordan Patel",
            email: "jordan@example.com",
            role: "Backend Developer",
            avatar: "https://via.placeholder.com/40",
            initials: "JP",
            joinedAt: "2024-01-20",
          },
          {
            id: "user125",
            name: "Casey Zhang",
            email: "casey@example.com",
            role: "Frontend Developer",
            avatar: "https://via.placeholder.com/40",
            initials: "CZ",
            joinedAt: "2024-01-25",
          },
          {
            id: "user126",
            name: "Taylor Brown",
            email: "taylor@example.com",
            role: "System Administrator",
            avatar: "https://via.placeholder.com/40",
            initials: "TB",
            joinedAt: "2024-02-01",
          },
        ])

        setTasks([
          {
            id: "task1",
            title: "Set up registration portal",
            description: "Configure the registration system for the AI Workshop Series",
            dueDate: "2025-04-15",
            priority: "High",
            status: "In Progress",
            assignedTo: "user124",
            assignee: { name: "Jordan Patel", avatar: "https://via.placeholder.com/40" },
            event: "AI Workshop Series",
            aiAssigned: true,
            completed: false,
          },
          {
            id: "task2",
            title: "Create event website",
            description: "Design and develop the website for the National Hackathon",
            dueDate: "2025-04-10",
            priority: "High",
            status: "In Progress",
            assignedTo: "user125",
            assignee: { name: "Casey Zhang", avatar: "https://via.placeholder.com/40" },
            event: "National Hackathon 2025",
            aiAssigned: false,
            completed: false,
          },
          {
            id: "task3",
            title: "Set up server infrastructure",
            description: "Prepare the server infrastructure for the hackathon submissions",
            dueDate: "2025-04-20",
            priority: "Medium",
            status: "Not Started",
            assignedTo: "user126",
            assignee: { name: "Taylor Brown", avatar: "https://via.placeholder.com/40" },
            event: "National Hackathon 2025",
            aiAssigned: true,
            completed: false,
          },
          {
            id: "task4",
            title: "Test registration system",
            description: "Perform thorough testing of the registration system",
            dueDate: "2025-04-25",
            priority: "Medium",
            status: "Not Started",
            assignedTo: "user123",
            assignee: { name: "Sam Wilson", avatar: "https://via.placeholder.com/40" },
            event: "AI Workshop Series",
            aiAssigned: false,
            completed: false,
          },
        ])

        setEvents([
          { id: "event1", title: "National Hackathon 2025", date: "May 15-17, 2025", status: "In Progress" },
          { id: "event2", title: "AI Workshop Series", date: "June 5-10, 2025", status: "Planning" },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching team data:", error)
        setError("Failed to load team data. Please try again.")
        setLoading(false)
      }
    }

    fetchTeamData()
  }, [id])

  const handleAddMember = async (e) => {
    e.preventDefault()
    try {
      // In a real app, this would be an API call
      // await api.post(`/api/teams/${id}/members`, newMember);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add new member to the list
      const newMemberId = `user${Math.floor(Math.random() * 1000)}`
      const memberToAdd = {
        id: newMemberId,
        name: newMember.email.split("@")[0], // Just for demo
        email: newMember.email,
        role: newMember.role,
        avatar: "https://via.placeholder.com/40",
        initials: newMember.email.substring(0, 2).toUpperCase(),
        joinedAt: new Date().toISOString().split("T")[0],
      }

      setMembers([...members, memberToAdd])
      setNewMember({ email: "", role: "" })
      setShowAddMemberModal(false)
    } catch (error) {
      console.error("Error adding member:", error)
      setError("Failed to add member. Please try again.")
    }
  }

  const handleRemoveMember = async (memberId) => {
    if (window.confirm("Are you sure you want to remove this member from the team?")) {
      try {
        // In a real app, this would be an API call
        // await api.delete(`/api/teams/${id}/members/${memberId}`);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Remove member from the list
        setMembers(members.filter((member) => member.id !== memberId))
      } catch (error) {
        console.error("Error removing member:", error)
        setError("Failed to remove member. Please try again.")
      }
    }
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    try {
      // In a real app, this would be an API call
      // await api.post(`/api/teams/${id}/tasks`, newTask);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add new task to the list
      const assignee = members.find((member) => member.id === newTask.assignedTo)
      const taskToAdd = {
        id: `task${Math.floor(Math.random() * 1000)}`,
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        status: "Not Started",
        assignedTo: newTask.assignedTo,
        assignee: {
          name: assignee.name,
          avatar: assignee.avatar,
        },
        event: newTask.event,
        aiAssigned: false,
        completed: false,
      }

      setTasks([...tasks, taskToAdd])
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        assignedTo: "",
        event: "",
      })
      setShowAddTaskModal(false)
    } catch (error) {
      console.error("Error adding task:", error)
      setError("Failed to add task. Please try again.")
    }
  }

  const handleAITaskAllocation = async (e) => {
    e.preventDefault()
    setAITaskLoading(true)

    try {
      // In a real app, this would be an API call
      // const res = await api.post(`/api/ai/task-allocation`, {
      //   teamId: id,
      //   description: aiTaskInput
      // });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock AI response
      const aiTasks = [
        {
          title: "Create database schema",
          description: "Design and implement the database schema for user registrations",
          assignedTo: "user124", // Jordan Patel (Backend Developer)
          dueDate: "2025-04-18",
          priority: "High",
          event: "AI Workshop Series",
        },
        {
          title: "Implement authentication system",
          description: "Set up secure authentication for the event platform",
          assignedTo: "user125", // Casey Zhang (Frontend Developer)
          dueDate: "2025-04-20",
          priority: "High",
          event: "AI Workshop Series",
        },
        {
          title: "Configure server monitoring",
          description: "Set up monitoring tools to track server performance during the event",
          assignedTo: "user126", // Taylor Brown (System Administrator)
          dueDate: "2025-04-22",
          priority: "Medium",
          event: "AI Workshop Series",
        },
      ]

      setAITaskResult(aiTasks)
      setAITaskLoading(false)
    } catch (error) {
      console.error("Error with AI task allocation:", error)
      setError("Failed to allocate tasks using AI. Please try again.")
      setAITaskLoading(false)
    }
  }

  const confirmAITasks = async () => {
    try {
      // In a real app, this would be an API call
      // await api.post(`/api/teams/${id}/tasks/batch`, aiTaskResult);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add AI tasks to the list
      const newTasks = aiTaskResult.map((task) => {
        const assignee = members.find((member) => member.id === task.assignedTo)
        return {
          id: `task${Math.floor(Math.random() * 1000)}`,
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
          status: "Not Started",
          assignedTo: task.assignedTo,
          assignee: {
            name: assignee.name,
            avatar: assignee.avatar,
          },
          event: task.event,
          aiAssigned: true,
          completed: false,
        }
      })

      setTasks([...tasks, ...newTasks])
      setAITaskInput("")
      setAITaskResult(null)
      setShowAITaskModal(false)
    } catch (error) {
      console.error("Error confirming AI tasks:", error)
      setError("Failed to add AI-generated tasks. Please try again.")
    }
  }

  const toggleTaskCompletion = async (taskId) => {
    try {
      // In a real app, this would be an API call
      // await api.patch(`/api/tasks/${taskId}`, { completed: !tasks.find(t => t.id === taskId).completed });

      // Update task in the list
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: !task.completed, status: !task.completed ? "Completed" : "In Progress" }
            : task,
        ),
      )
    } catch (error) {
      console.error("Error updating task:", error)
      setError("Failed to update task. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading team data...</p>
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
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{team.name}</h1>
          <p className="text-gray-500">{team.community} Community</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button
            onClick={() => navigate(`/teams/${id}`)}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
            View Team
          </button>
          <button
            onClick={() => setShowAITaskModal(true)}
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
            AI Task Allocation
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex border-b">
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "members"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "tasks"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("tasks")}
          >
            Tasks
          </button>
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "events"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "analytics"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
        </div>

        <div className="p-6">
          {/* Members Tab */}
          {activeTab === "members" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Team Members</h2>
                <button
                  onClick={() => setShowAddMemberModal(true)}
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  Add Member
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Member
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Joined
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {members.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              {member.avatar ? (
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={member.avatar || "/placeholder.svg"}
                                  alt={member.name}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-medium">
                                  {member.initials}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                              {member.id === team.leadId && (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Team Lead
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{member.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.joinedAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={member.id === team.leadId}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === "tasks" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Team Tasks</h2>
                <button
                  onClick={() => setShowAddTaskModal(true)}
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
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  Add Task
                </button>
              </div>

              <div className="space-y-4">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <input
                        type="checkbox"
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-gray-500">{task.description}</p>
                          </div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              task.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : task.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1 h-3 w-3 text-gray-500"
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
                              <span className="text-gray-500">{task.dueDate}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-500">{task.event}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {task.aiAssigned && (
                              <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
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
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                AI Assigned
                              </span>
                            )}
                            <div className="flex items-center space-x-1">
                              <img
                                src={task.assignee.avatar || "/placeholder.svg"}
                                alt={task.assignee.name}
                                className="h-6 w-6 rounded-full"
                              />
                              <span className="text-xs text-gray-500">{task.assignee.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No tasks assigned to this team yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Assigned Events</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.length > 0 ? (
                  events.map((event) => (
                    <div key={event.id} className="rounded-lg border border-gray-200 bg-white shadow-sm">
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold">{event.title}</h3>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              event.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : event.status === "Planning"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {event.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">{event.date}</p>

                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Team Tasks for this Event</h4>
                          <div className="space-y-2">
                            {tasks
                              .filter((task) => task.event === event.title)
                              .map((task) => (
                                <div key={task.id} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={task.completed}
                                      onChange={() => toggleTaskCompletion(task.id)}
                                      className="mr-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className={task.completed ? "line-through text-gray-400" : ""}>
                                      {task.title}
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-500">{task.assignee.name}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex border-t p-4">
                        <button
                          onClick={() => navigate(`/events/${event.id}`)}
                          className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-50"
                        >
                          View Event
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-gray-500">No events assigned to this team yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Team Analytics</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-medium mb-4">Task Completion</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-gray-500">
                          {tasks.filter((t) => t.completed).length} / {tasks.length} tasks
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-purple-600"
                          style={{
                            width: `${tasks.length ? (tasks.filter((t) => t.completed).length / tasks.length) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">By Priority</span>
                      </div>
                      <div className="space-y-2">
                        {["High", "Medium", "Low"].map((priority) => {
                          const priorityTasks = tasks.filter((t) => t.priority === priority)
                          const completed = priorityTasks.filter((t) => t.completed).length
                          const total = priorityTasks.length
                          return (
                            <div key={priority}>
                              <div className="flex justify-between items-center">
                                <span className="text-xs">{priority}</span>
                                <span className="text-xs text-gray-500">
                                  {completed} / {total}
                                </span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-gray-100">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    priority === "High"
                                      ? "bg-red-500"
                                      : priority === "Medium"
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
                                ></div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-medium mb-4">Member Workload</h3>
                  <div className="space-y-4">
                    {members.map((member) => {
                      const memberTasks = tasks.filter((t) => t.assignedTo === member.id)
                      const completed = memberTasks.filter((t) => t.completed).length
                      const total = memberTasks.length
                      return (
                        <div key={member.id}>
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                                <img src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              </div>
                              <span className="text-sm font-medium">{member.name}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {completed} / {total} tasks
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100">
                            <div
                              className="h-2 rounded-full bg-purple-600"
                              style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-medium mb-4">Event Distribution</h3>
                  <div className="space-y-4">
                    {events.map((event) => {
                      const eventTasks = tasks.filter((t) => t.event === event.title)
                      const completed = eventTasks.filter((t) => t.completed).length
                      const total = eventTasks.length
                      return (
                        <div key={event.id}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">{event.title}</span>
                            <span className="text-sm text-gray-500">
                              {completed} / {total} tasks
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100">
                            <div
                              className="h-2 rounded-full bg-purple-600"
                              style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-medium mb-4">AI Task Allocation</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      AI has allocated {tasks.filter((t) => t.aiAssigned).length} tasks to team members based on their
                      skills and current workload.
                    </p>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">AI Allocated Tasks</span>
                        <span className="text-sm text-gray-500">
                          {tasks.filter((t) => t.aiAssigned && t.completed).length} /{" "}
                          {tasks.filter((t) => t.aiAssigned).length} completed
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-purple-600"
                          style={{
                            width: `${tasks.filter((t) => t.aiAssigned).length ? (tasks.filter((t) => t.aiAssigned && t.completed).length / tasks.filter((t) => t.aiAssigned).length) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowAddMemberModal(false)}
            ></div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add Team Member</h3>
                    <div className="mt-2">
                      <form onSubmit={handleAddMember} className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={newMember.email}
                            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                          </label>
                          <input
                            type="text"
                            id="role"
                            name="role"
                            value={newMember.role}
                            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Add Member
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={() => setShowAddMemberModal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowAddTaskModal(false)}
            ></div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add Task</h3>
                    <div className="mt-2">
                      <form onSubmit={handleAddTask} className="space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Task Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            rows={3}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                              Due Date
                            </label>
                            <input
                              type="date"
                              id="dueDate"
                              name="dueDate"
                              value={newTask.dueDate}
                              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                              required
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                              Priority
                            </label>
                            <select
                              id="priority"
                              name="priority"
                              value={newTask.priority}
                              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                            Assign To
                          </label>
                          <select
                            id="assignedTo"
                            name="assignedTo"
                            value={newTask.assignedTo}
                            onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">Select team member</option>
                            {members.map((member) => (
                              <option key={member.id} value={member.id}>
                                {member.name} - {member.role}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="event" className="block text-sm font-medium text-gray-700">
                            Related Event
                          </label>
                          <select
                            id="event"
                            name="event"
                            value={newTask.event}
                            onChange={(e) => setNewTask({ ...newTask, event: e.target.value })}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">Select event</option>
                            {events.map((event) => (
                              <option key={event.id} value={event.title}>
                                {event.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Add Task
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={() => setShowAddTaskModal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Task Allocation Modal */}
      {showAITaskModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => {
                if (!aiTaskLoading) {
                  setShowAITaskModal(false)
                  setAITaskResult(null)
                }
              }}
            ></div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">AI Task Allocation</h3>
                    <div className="mt-2">
                      {!aiTaskResult ? (
                        <form onSubmit={handleAITaskAllocation} className="space-y-4">
                          <div>
                            <label htmlFor="aiTaskInput" className="block text-sm font-medium text-gray-700">
                              Describe the tasks you need to allocate
                            </label>
                            <textarea
                              id="aiTaskInput"
                              name="aiTaskInput"
                              value={aiTaskInput}
                              onChange={(e) => setAITaskInput(e.target.value)}
                              required
                              rows={4}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="e.g., We need to set up a registration system for the AI Workshop Series. This includes database setup, authentication, and frontend implementation."
                            ></textarea>
                          </div>
                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="submit"
                              disabled={aiTaskLoading}
                              className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                            >
                              {aiTaskLoading ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                  Analyzing...
                                </>
                              ) : (
                                "Generate Tasks"
                              )}
                            </button>
                            <button
                              type="button"
                              disabled={aiTaskLoading}
                              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50"
                              onClick={() => setShowAITaskModal(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-sm text-gray-500">
                            AI has analyzed your request and suggested the following task allocation based on team
                            members' skills and current workload:
                          </p>
                          <div className="space-y-4 mt-4">
                            {aiTaskResult.map((task, index) => {
                              const assignee = members.find((m) => m.id === task.assignedTo)
                              return (
                                <div key={index} className="rounded-md border border-gray-200 p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{task.title}</h4>
                                      <p className="text-sm text-gray-500">{task.description}</p>
                                    </div>
                                    <span
                                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                        task.priority === "High"
                                          ? "bg-red-100 text-red-800"
                                          : task.priority === "Medium"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {task.priority}
                                    </span>
                                  </div>
                                  <div className="mt-2 flex justify-between items-center text-sm">
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-1 h-3 w-3 text-gray-500"
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
                                      <span className="text-gray-500">Due: {task.dueDate}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <img
                                        src={assignee?.avatar || "/placeholder.svg"}
                                        alt={assignee?.name}
                                        className="h-5 w-5 rounded-full"
                                      />
                                      <span className="text-xs text-gray-500">{assignee?.name}</span>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="button"
                              onClick={confirmAITasks}
                              className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Confirm Tasks
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                              onClick={() => {
                                setAITaskResult(null)
                                setShowAITaskModal(false)
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamManagePage

