"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, CheckCircle, AlertCircle, BarChart3, CalendarIcon } from "lucide-react"
import { DashboardEvents } from "@/components/dashboard-events"
import { DashboardTasks } from "@/components/dashboard-tasks"
import { DashboardTeams } from "@/components/dashboard-teams"

export default function DashboardPage() {
  const [role, setRole] = useState("admin")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Calendar View</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">3 upcoming this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <Progress value={78} className="h-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Event Progress</CardTitle>
                <CardDescription>Overview of all current events and their completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "National Hackathon 2025", progress: 65, status: "In Progress" },
                    { name: "AI Workshop Series", progress: 25, status: "Planning" },
                    { name: "Leadership Summit", progress: 10, status: "Planning" },
                    { name: "Tech Career Fair", progress: 90, status: "Almost Complete" },
                  ].map((event) => (
                    <div key={event.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{event.name}</span>
                          <Badge
                            variant={
                              event.status === "In Progress"
                                ? "default"
                                : event.status === "Planning"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {event.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{event.progress}%</span>
                      </div>
                      <Progress value={event.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Team Task Overview</CardTitle>
                <CardDescription>Tasks assigned to each team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { team: "PR Team", total: 24, completed: 18, overdue: 2 },
                    { team: "Technical Team", total: 32, completed: 25, overdue: 1 },
                    { team: "Creative Team", total: 18, completed: 12, overdue: 3 },
                    { team: "Logistics Team", total: 15, completed: 10, overdue: 0 },
                  ].map((team) => (
                    <div key={team.team} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{team.team}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-green-600 dark:text-green-400">{team.completed} completed</span>
                          {team.overdue > 0 && (
                            <span className="flex items-center text-sm text-red-600 dark:text-red-400">
                              <AlertCircle className="mr-1 h-3 w-3" />
                              {team.overdue} overdue
                            </span>
                          )}
                        </div>
                      </div>
                      <Progress value={(team.completed / team.total) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <DashboardEvents />
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <DashboardTasks />
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <DashboardTeams />
        </TabsContent>
      </Tabs>
    </div>
  )
}

