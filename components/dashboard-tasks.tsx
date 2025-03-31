"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, PlusCircle, Sparkles } from "lucide-react"

export function DashboardTasks() {
  const [tasks, setTasks] = useState([
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
        avatar: "/placeholder.svg?height=32&width=32",
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
        avatar: "/placeholder.svg?height=32&width=32",
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
        avatar: "/placeholder.svg?height=32&width=32",
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
        avatar: "/placeholder.svg?height=32&width=32",
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
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
      },
      event: "National Hackathon 2025",
      aiAssigned: true,
      completed: false,
    },
  ])

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, status: !task.completed ? "Completed" : "In Progress" }
          : task,
      ),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Task Management</h3>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="ai-assigned">AI Assigned</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>View and manage all tasks across events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-4 rounded-md border p-4">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                            {task.title}
                          </p>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                        <Badge
                          variant={
                            task.status === "Completed"
                              ? "outline"
                              : task.status === "In Progress"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{task.dueDate}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-muted-foreground">{task.event}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {task.aiAssigned && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                            >
                              <Sparkles className="h-3 w-3" />
                              AI Assigned
                            </Badge>
                          )}
                          <div className="flex items-center space-x-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                              <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>Tasks assigned to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks
                  .filter((task) => task.assignee.name === "Alex Johnson")
                  .map((task) => (
                    <div key={task.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <Checkbox
                        id={`my-task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                          <Badge
                            variant={
                              task.status === "Completed"
                                ? "outline"
                                : task.status === "In Progress"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {task.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{task.dueDate}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-muted-foreground">{task.event}</span>
                            </div>
                          </div>
                          {task.aiAssigned && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                            >
                              <Sparkles className="h-3 w-3" />
                              AI Assigned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-assigned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Assigned Tasks</CardTitle>
              <CardDescription>Tasks automatically assigned by AI based on workload and skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks
                  .filter((task) => task.aiAssigned)
                  .map((task) => (
                    <div key={task.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <Checkbox
                        id={`ai-task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                          <Badge
                            variant={
                              task.status === "Completed"
                                ? "outline"
                                : task.status === "In Progress"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {task.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{task.dueDate}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-muted-foreground">{task.event}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                              <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
              <CardDescription>Tasks that have been completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks
                  .filter((task) => task.completed)
                  .map((task) => (
                    <div key={task.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <Checkbox
                        id={`completed-task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium line-through text-muted-foreground">{task.title}</p>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{task.dueDate}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-muted-foreground">{task.event}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                              <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

