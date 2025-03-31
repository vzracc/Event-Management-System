"use client"

import { useState } from "react"

const AITaskAllocation = ({ teamId, members, events, onTasksGenerated }) => {
  const [taskDescription, setTaskDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [generatedTasks, setGeneratedTasks] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      // const res = await api.post('/api/ai/task-allocation', {
      //   teamId,
      //   description: taskDescription,
      //   eventId: selectedEvent
      // });
      // setGeneratedTasks(res.data.tasks);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock AI response
      const aiTasks = [
        {
          title: "Create database schema",
          description: "Design and implement the database schema for user registrations",
          assignedTo: members[1].id, // Backend Developer
          dueDate: "2025-04-18",
          priority: "High",
          event: events[0].title,
        },
        {
          title: "Implement authentication system",
          description: "Set up secure authentication for the event platform",
          assignedTo: members[2].id, // Frontend Developer
          dueDate: "2025-04-20",
          priority: "High",
          event: events[0].title,
        },
        {
          title: "Configure server monitoring",
          description: "Set up monitoring tools to track server performance during the event",
          assignedTo: members[3].id, // System Administrator
          dueDate: "2025-04-22",
          priority: "Medium",
          event: events[0].title,
        },
      ]

      setGeneratedTasks(aiTasks)
    } catch (error) {
      console.error("Error with AI task allocation:", error)
      setError("Failed to generate tasks. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const confirmTasks = () => {
    onTasksGenerated(generatedTasks)
    setGeneratedTasks(null)
    setTaskDescription("")
  }

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
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
          <div className="ml-3">
            <h3 className="text-sm font-medium text-purple-800">AI Task Allocation</h3>
            <div className="mt-2 text-sm text-purple-700">
              <p>
                Our AI can analyze your team members' skills, current workload, and task requirements to optimally
                allocate tasks. Simply describe the work that needs to be done, and the AI will suggest the best
                allocation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

      {!generatedTasks ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">
              Describe the tasks that need to be allocated
            </label>
            <textarea
              id="taskDescription"
              name="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., We need to set up a registration system for the upcoming hackathon. This includes database setup, authentication, and frontend implementation."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing and Generating Tasks...
              </div>
            ) : (
              "Generate Task Allocation"
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">AI-Generated Task Allocation</h3>
          <p className="text-sm text-gray-500">
            Based on your team members' skills and current workload, the AI suggests the following task allocation:
          </p>

          <div className="space-y-4 mt-4">
            {generatedTasks.map((task, index) => {
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

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={confirmTasks}
              className="flex-1 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Confirm Tasks
            </button>
            <button
              type="button"
              onClick={() => setGeneratedTasks(null)}
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AITaskAllocation

