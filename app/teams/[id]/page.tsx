"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, AlertCircle, PlusCircle, UserPlus, Settings } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function TeamDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState<any>(null)

  useEffect(() => {
    // Simulate fetching team data from API
    const fetchTeam = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/teams/${params.id}`);
        // const data = await response.json();

        // Simulated data
        const mockTeam = {
          id: params.id,
          name: "Creative Team",
          community: "ISTE",
          description: "Creates visual content and designs for events",
          members: [
            {
              id: "1",
              name: "Alex Johnson",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "AJ",
              role: "Team Lead",
              skills: ["Graphic Design", "UI/UX", "Branding"],
              email: "alex.johnson@example.com",
            },
            {
              id: "2",
              name: "Quinn Martinez",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "QM",
              role: "Graphic Designer",
              skills: ["Illustration", "Typography", "Print Design"],
              email: "quinn.martinez@example.com",
            },
            {
              id: "3",
              name: "Avery Williams",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "AW",
              role: "UI/UX Designer",
              skills: ["Web Design", "Prototyping", "User Research"],
              email: "avery.williams@example.com",
            },
          ],
          tasks: {
            total: 18,
            completed: 12,
            overdue: 3,
            items: [
              {
                id: "1",
                title: "Design event poster",
                description: "Create a poster for the National Hackathon 2025",
                dueDate: "April 10, 2025",
                priority: "High",
                status: "In Progress",
                assignedTo: "Alex Johnson",
                event: "National Hackathon 2025",
                completed: false,
              },
              {
                id: "2",
                title: "Create social media graphics",
                description: "Design graphics for Instagram, Twitter, and Facebook",
                dueDate: "April 15, 2025",
                priority: "Medium",
                status: "In Progress",
                assignedTo: "Quinn Martinez",
                event: "National Hackathon 2025",
                completed: false,
              },
              {
                id: "3",
                title: "Design event badges",
                description: "Create badges for participants, speakers, and staff",
                dueDate: "April 20, 2025",
                priority: "Medium",
                status: "Not Started",
                assignedTo: "Avery Williams",
                event: "National Hackathon 2025",
                completed: false,
              },
              {
                id: "4",
                title: "Create presentation template",
                description: "Design a PowerPoint/Keynote template for speakers",
                dueDate: "April 5, 2025",
                priority: "Low",
                status: "Completed",
                assignedTo: "Alex Johnson",
                event: "Leadership Summit",
                completed: true,
              },
            ],
          },
          events: [
            { id: "1", name: "National Hackathon 2025", date: "May 15-17, 2025" },
            { id: "2", name: "Leadership Summit", date: "July 20-22, 2025" },
          ],
          performance: {
            taskCompletionRate: 67,
            onTimeCompletionRate: 85,
            averageTasksPerMember: 6,
          },
        }

        setTeam(mockTeam)
      } catch (error) {
        console.error("Error fetching team:", error)
        toast({
          title: "Error",
          description: "Failed to load team details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeam()
  }, [params.id, toast])

  const toggleTaskCompletion = (taskId: string) => {
    setTeam((prevTeam) => {
      const updatedTasks = prevTeam.tasks.items.map((task: any) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              status: !task.completed ? "Completed" : "In Progress",
            }
          : task,
      )

      const completedCount = updatedTasks.filter((task: any) => task.completed).length

      return {
        ...prevTeam,
        tasks: {
          ...prevTeam.tasks,
          items: updatedTasks,
          completed: completedCount,
        },
      }
    })
  }

  if (isLoading || !team) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading team details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-teal-800 dark:text-teal-300">{team.name}</h1>
              <p className="text-muted-foreground">{team.community} Community</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/teams/${team.id}/edit`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Team
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={`/teams/${team.id}/manage`}>Manage Team</Link>
              </Button>
            </div>
          </div>

          <Card className="border-teal-200 dark:border-teal-800">
            <CardHeader className="bg-teal-50 dark:bg-teal-950">
              <CardTitle className="text-teal-800 dark:text-teal-300">Team Overview</CardTitle>
              <CardDescription>{team.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border p-4 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Task Completion</h3>
                    <p className="text-2xl font-bold">{team.performance.taskCompletionRate}%</p>
                    <Progress value={team.performance.taskCompletionRate} className="h-2 mt-2" />
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">On-Time Completion</h3>
                    <p className="text-2xl font-bold">{team.performance.onTimeCompletionRate}%</p>
                    <Progress value={team.performance.onTimeCompletionRate} className="h-2 mt-2" />
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Tasks Per Member</h3>
                    <p className="text-2xl font-bold">{team.performance.averageTasksPerMember}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Team Members</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {team.members.map((member: any) => (
                      <div key={member.id} className="flex items-start space-x-4 rounded-lg border p-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{member.name}</h4>
                            <Badge variant="outline">{member.role}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {member.skills.map((skill: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-center rounded-lg border border-dashed p-4">
                      <Button variant="ghost" asChild>
                        <Link href={`/teams/${team.id}/members/add`} className="flex items-center">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Add Team Member
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Assigned Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {team.events.map((event: any) => (
                      <Card key={event.id}>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">{event.name}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4" />
                              {event.date}
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="outline" size="sm" asChild className="w-full">
                            <Link href={`/events/${event.id}`}>View Event</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Tasks</TabsTrigger>
              <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Tasks</CardTitle>
                  <CardDescription>Tasks that are currently in progress or not started</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {team.tasks.items
                      .filter((task: any) => !task.completed)
                      .map((task: any) => (
                        <div key={task.id} className="flex items-start space-x-4 rounded-md border p-4">
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task.id)}
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{task.title}</p>
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
                                <span className="text-xs text-muted-foreground">Assigned to: {task.assignedTo}</span>
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
                    {team.tasks.items
                      .filter((task: any) => task.completed)
                      .map((task: any) => (
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
                                <span className="text-xs text-muted-foreground">Completed by: {task.assignedTo}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Tasks</CardTitle>
                  <CardDescription>All tasks assigned to this team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {team.tasks.items.map((task: any) => (
                      <div key={task.id} className="flex items-start space-x-4 rounded-md border p-4">
                        <Checkbox
                          id={`all-task-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p
                                className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                              >
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
                              <span className="text-xs text-muted-foreground">Assigned to: {task.assignedTo}</span>
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

        <div className="space-y-6">
          <Card className="border-teal-200 dark:border-teal-800">
            <CardHeader className="bg-teal-50 dark:bg-teal-950">
              <CardTitle className="text-teal-800 dark:text-teal-300">Team Stats</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Task Completion:</span>
                    <span>
                      {team.tasks.completed}/{team.tasks.total} tasks
                    </span>
                  </div>
                  <Progress value={(team.tasks.completed / team.tasks.total) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Team Members:</span>
                    <span>{team.members.length}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Assigned Events:</span>
                    <span>{team.events.length}</span>
                  </div>
                </div>

                {team.tasks.overdue > 0 && (
                  <div className="rounded-md bg-red-50 p-3 dark:bg-red-950">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Overdue Tasks</h3>
                        <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                          <p>There are {team.tasks.overdue} overdue tasks that need attention.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600" asChild>
                <Link href={`/teams/${team.id}/tasks/create`}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Task
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: "Alex Johnson",
                    action: "completed a task",
                    time: "2 hours ago",
                    task: "Create presentation template",
                  },
                  {
                    user: "Quinn Martinez",
                    action: "was assigned a task",
                    time: "5 hours ago",
                    task: "Create social media graphics",
                  },
                  {
                    user: "Avery Williams",
                    action: "commented on a task",
                    time: "1 day ago",
                    task: "Design event badges",
                  },
                  { user: "Alex Johnson", action: "created a task", time: "2 days ago", task: "Design event poster" },
                ].map((activity, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      {index < 3 && <div className="h-full w-0.5 bg-border"></div>}
                    </div>
                    <div className="space-y-1 pb-4">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <p className="text-sm text-muted-foreground">"{activity.task}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

