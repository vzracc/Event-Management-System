"use client"

import { useState, useEffect } from "react"

const DashboardTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // In a real app, this would be an API call
        // const res = await api.get('/api/tasks');
        // setTasks(res.data.tasks);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setTasks([
          {
            id: 1,
            title: "Design event poster",
            description: "Create a poster for the National Hackathon 2025",
            dueDate: "April 10, 2025",
            priority: "High",
            status: "In Progress",
            assignedTo: "Creative Team",
            assignee: {
              name: "Alex Johnson",
              avatar: "https://via.placeholder.com/32",
              initials: "AJ",
            },
            event: "National Hackathon 2025",
            aiAssigned: true,
            completed: false,
          },
          {
            id: 2,
            title: "Set up registration portal",
            description: "Configure the registration system for the AI Workshop Series",
            dueDate: "April 15, 2025",
            priority: "High",
            status: "In Progress",
            assignedTo: "Technical Team",
            assignee: {
              name: "Sam Wilson",
              avatar: "https://via.placeholder.com/32",
              initials: "SW",
            },
            event: "AI Workshop Series",
            aiAssigned: true,
            completed: false,
          },
          {
            id: 3,
            title: "Contact speakers",
            description: "Reach out to potential speakers for the Leadership Summit",
            dueDate: "April 20, 2025",
            priority: "Medium",
            status: "Not Started",
            assignedTo: "PR Team",
            assignee: {
              name: "Jamie Lee",
              avatar: "https://via.placeholder.com/32",
              initials: "JL",
            },
            event: "Leadership Summit",
            aiAssigned: true,
            completed: false,
          },
          {
            id: 4,
            title: "Arrange venue logistics",
            description: "Coordinate with the venue for the Tech Career Fair",
            dueDate: "April 5, 2025",
            priority: "High",
            status: "Completed",
            assignedTo: "Logistics Team",
            assignee: {
              name: "Taylor Smith",
              avatar: "https://via.placeholder.com/32",
              initials: "TS",
            },
            event: "Tech Career Fair",
            aiAssigned: false,
            completed: true,
          },
          {
            id: 5,
            title: "Create social media campaign",
            description: "Develop a social media strategy for the National Hackathon",
            dueDate: "April 12, 2025",
            priority: "Medium",
            status: "In Progress",
            assignedTo: "PR Team",
            assignee: {
              name: "Morgan Chen",
              avatar: "https://via.placeholder.com/32",
              initials: "MC",
            },
            event: "National Hackathon 2025",
            aiAssigned: true,
            completed: false,
          },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching tasks:", error)
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, status: !task.completed ? "Completed" : "In Progress" }
          : task,
      ),
    )
  }

  const filteredTasks =
    activeTab === "all"
      ? tasks
      : activeTab === "my-tasks"
        ? tasks.filter((task) => task.assignee.name === "Alex Johnson") // Simulating current user
        : activeTab === "ai-assigned"
          ? tasks.filter((task) => task.aiAssigned)
          : tasks.filter((task) => task.completed)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Task Management</h3>
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
          Create Task
        </button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex border-b">
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "all" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Tasks
          </button>
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "my-tasks"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("my-tasks")}
          >
            My Tasks
          </button>
          <button
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              activeTab === "ai-assigned"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("ai-assigned")}
          >
            AI Assigned
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
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
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
                <p className="text-gray-500">No tasks found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardTasks

