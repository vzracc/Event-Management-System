"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Users, PlusCircle } from "lucide-react"
import Link from "next/link"

export function DashboardTeams() {
  const teams = [
    {
      id: 1,
      name: "PR Team",
      community: "CSI",
      description: "Handles public relations and marketing for events",
      members: [
        { name: "Jamie Lee", avatar: "/placeholder.svg?height=32&width=32", initials: "JL", role: "Team Lead" },
        {
          name: "Morgan Chen",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "MC",
          role: "Social Media Manager",
        },
        { name: "Riley Kim", avatar: "/placeholder.svg?height=32&width=32", initials: "RK", role: "Content Creator" },
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
        { name: "Sam Wilson", avatar: "/placeholder.svg?height=32&width=32", initials: "SW", role: "Team Lead" },
        {
          name: "Jordan Patel",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "JP",
          role: "Backend Developer",
        },
        {
          name: "Casey Zhang",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "CZ",
          role: "Frontend Developer",
        },
        {
          name: "Taylor Brown",
          avatar: "/placeholder.svg?height=32&width=32",
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
        { name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "AJ", role: "Team Lead" },
        {
          name: "Quinn Martinez",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "QM",
          role: "Graphic Designer",
        },
        {
          name: "Avery Williams",
          avatar: "/placeholder.svg?height=32&width=32",
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
        { name: "Taylor Smith", avatar: "/placeholder.svg?height=32&width=32", initials: "TS", role: "Team Lead" },
        {
          name: "Jordan Lee",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "JL",
          role: "Venue Coordinator",
        },
        {
          name: "Reese Garcia",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "RG",
          role: "Equipment Manager",
        },
      ],
      tasks: { total: 15, completed: 10, overdue: 0 },
      events: ["Tech Career Fair", "Leadership Summit"],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Team Management</h3>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>

      <Tabs defaultValue="all-teams" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-teams">All Teams</TabsTrigger>
          <TabsTrigger value="my-teams">My Teams</TabsTrigger>
          <TabsTrigger value="by-community">By Community</TabsTrigger>
        </TabsList>

        <TabsContent value="all-teams" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {teams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{team.name}</CardTitle>
                      <CardDescription>{team.community} Community</CardDescription>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {team.members.length} Members
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{team.description}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Team Members</h4>
                      <div className="flex flex-wrap gap-2">
                        {team.members.map((member) => (
                          <div
                            key={member.name}
                            className="flex items-center space-x-2 rounded-full bg-secondary px-3 py-1"
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{member.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Task Progress</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-green-600 dark:text-green-400">
                            {team.tasks.completed} completed
                          </span>
                          {team.tasks.overdue > 0 && (
                            <span className="flex items-center text-xs text-red-600 dark:text-red-400">
                              <AlertCircle className="mr-1 h-3 w-3" />
                              {team.tasks.overdue} overdue
                            </span>
                          )}
                        </div>
                      </div>
                      <Progress value={(team.tasks.completed / team.tasks.total) * 100} className="h-2" />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Assigned Events</h4>
                      <div className="flex flex-wrap gap-2">
                        {team.events.map((event) => (
                          <Badge key={event} variant="secondary">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/teams/${team.id}`}>View Details</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/teams/${team.id}/manage`}>Manage Team</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-teams" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {teams
              .filter((team) => team.members.some((member) => member.name === "Alex Johnson"))
              .map((team) => (
                <Card key={team.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{team.name}</CardTitle>
                        <CardDescription>{team.community} Community</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {team.members.length} Members
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{team.description}</p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Team Members</h4>
                        <div className="flex flex-wrap gap-2">
                          {team.members.map((member) => (
                            <div
                              key={member.name}
                              className="flex items-center space-x-2 rounded-full bg-secondary px-3 py-1"
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.initials}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs">{member.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">Task Progress</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-green-600 dark:text-green-400">
                              {team.tasks.completed} completed
                            </span>
                            {team.tasks.overdue > 0 && (
                              <span className="flex items-center text-xs text-red-600 dark:text-red-400">
                                <AlertCircle className="mr-1 h-3 w-3" />
                                {team.tasks.overdue} overdue
                              </span>
                            )}
                          </div>
                        </div>
                        <Progress value={(team.tasks.completed / team.tasks.total) * 100} className="h-2" />
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Assigned Events</h4>
                        <div className="flex flex-wrap gap-2">
                          {team.events.map((event) => (
                            <Badge key={event} variant="secondary">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/teams/${team.id}`}>View Details</Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/teams/${team.id}/manage`}>Manage Team</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="by-community" className="space-y-4">
          <Tabs defaultValue="csi" className="space-y-4">
            <TabsList>
              <TabsTrigger value="csi">CSI</TabsTrigger>
              <TabsTrigger value="iste">ISTE</TabsTrigger>
              <TabsTrigger value="tsdw">TSDW</TabsTrigger>
              <TabsTrigger value="ieee">IEEE</TabsTrigger>
            </TabsList>

            <TabsContent value="csi" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {teams
                  .filter((team) => team.community === "CSI")
                  .map((team) => (
                    <Card key={team.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{team.name}</CardTitle>
                            <CardDescription>{team.community} Community</CardDescription>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {team.members.length} Members
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{team.description}</p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Team Members</h4>
                            <div className="flex flex-wrap gap-2">
                              {team.members.map((member) => (
                                <div
                                  key={member.name}
                                  className="flex items-center space-x-2 rounded-full bg-secondary px-3 py-1"
                                >
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.initials}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{member.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium">Task Progress</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-green-600 dark:text-green-400">
                                  {team.tasks.completed} completed
                                </span>
                                {team.tasks.overdue > 0 && (
                                  <span className="flex items-center text-xs text-red-600 dark:text-red-400">
                                    <AlertCircle className="mr-1 h-3 w-3" />
                                    {team.tasks.overdue} overdue
                                  </span>
                                )}
                              </div>
                            </div>
                            <Progress value={(team.tasks.completed / team.tasks.total) * 100} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" asChild>
                          <Link href={`/teams/${team.id}`}>View Details</Link>
                        </Button>
                        <Button asChild>
                          <Link href={`/teams/${team.id}/manage`}>Manage Team</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="iste" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {teams
                  .filter((team) => team.community === "ISTE")
                  .map((team) => (
                    <Card key={team.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{team.name}</CardTitle>
                            <CardDescription>{team.community} Community</CardDescription>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {team.members.length} Members
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{team.description}</p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Team Members</h4>
                            <div className="flex flex-wrap gap-2">
                              {team.members.map((member) => (
                                <div
                                  key={member.name}
                                  className="flex items-center space-x-2 rounded-full bg-secondary px-3 py-1"
                                >
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.initials}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{member.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium">Task Progress</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-green-600 dark:text-green-400">
                                  {team.tasks.completed} completed
                                </span>
                                {team.tasks.overdue > 0 && (
                                  <span className="flex items-center text-xs text-red-600 dark:text-red-400">
                                    <AlertCircle className="mr-1 h-3 w-3" />
                                    {team.tasks.overdue} overdue
                                  </span>
                                )}
                              </div>
                            </div>
                            <Progress value={(team.tasks.completed / team.tasks.total) * 100} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" asChild>
                          <Link href={`/teams/${team.id}`}>View Details</Link>
                        </Button>
                        <Button asChild>
                          <Link href={`/teams/${team.id}/manage`}>Manage Team</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="tsdw" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {teams
                  .filter((team) => team.community === "TSDW")
                  .map((team) => (
                    <Card key={team.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{team.name}</CardTitle>
                            <CardDescription>{team.community} Community</CardDescription>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {team.members.length} Members
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{team.description}</p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Team Members</h4>
                            <div className="flex flex-wrap gap-2">
                              {team.members.map((member) => (
                                <div
                                  key={member.name}
                                  className="flex items-center space-x-2 rounded-full bg-secondary px-3 py-1"
                                >
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.initials}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{member.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium">Task Progress</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-green-600 dark:text-green-400">
                                  {team.tasks.completed} completed
                                </span>
                                {team.tasks.overdue > 0 && (
                                  <span className="flex items-center text-xs text-red-600 dark:text-red-400">
                                    <AlertCircle className="mr-1 h-3 w-3" />
                                    {team.tasks.overdue} overdue
                                  </span>
                                )}
                              </div>
                            </div>
                            <Progress value={(team.tasks.completed / team.tasks.total) * 100} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" asChild>
                          <Link href={`/teams/${team.id}`}>View Details</Link>
                        </Button>
                        <Button asChild>
                          <Link href={`/teams/${team.id}/manage`}>Manage Team</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="ieee" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {teams
                  .filter((team) => team.community === "IEEE")
                  .map((team) => (
                    <Card key={team.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{team.name}</CardTitle>
                            <CardDescription>{team.community} Community</CardDescription>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {team.members.length} Members
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{team.description}</p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Team Members</h4>
                            <div className="flex flex-wrap gap-2">
                              {team.members.map((member) => (
                                <div
                                  key={member.name}
                                  className="flex items-center space-x-2 rounded-full bg-secondary px-3 py-1"
                                >
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.initials}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{member.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium">Task Progress</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-green-600 dark:text-green-400">
                                  {team.tasks.completed} completed
                                </span>
                                {team.tasks.overdue > 0 && (
                                  <span className="flex items-center text-xs text-red-600 dark:text-red-400">
                                    <AlertCircle className="mr-1 h-3 w-3" />
                                    {team.tasks.overdue} overdue
                                  </span>
                                )}
                              </div>
                            </div>
                            <Progress value={(team.tasks.completed / team.tasks.total) * 100} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" asChild>
                          <Link href={`/teams/${team.id}`}>View Details</Link>
                        </Button>
                        <Button asChild>
                          <Link href={`/teams/${team.id}/manage`}>Manage Team</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}

