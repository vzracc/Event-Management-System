"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, Building, PlusCircle, Settings } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function CommunityDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [community, setCommunity] = useState<any>(null)

  useEffect(() => {
    // Simulate fetching community data from API
    const fetchCommunity = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/communities/${params.id}`);
        // const data = await response.json();

        // Simulated data
        const mockCommunity = {
          id: params.id,
          name: "CSI",
          fullName: "Computer Society of India",
          description:
            "The Computer Society of India (CSI) is the largest association of IT professionals in India. The CSI student chapter organizes various events, workshops, and competitions to promote computer science education and research.",
          logo: "/placeholder.svg?height=100&width=100",
          coverImage: "/placeholder.svg?height=400&width=800",
          established: "2010",
          college: "Tech University",
          website: "https://csi.example.com",
          email: "csi@techuniersity.edu",
          socialMedia: {
            instagram: "csi_techuniversity",
            twitter: "csi_techuni",
            linkedin: "csi-tech-university",
          },
          chairperson: {
            name: "Dr. Jane Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "JS",
            email: "jane.smith@example.com",
          },
          teams: [
            {
              id: "1",
              name: "PR Team",
              members: 3,
              description: "Handles public relations and marketing for events",
            },
            {
              id: "2",
              name: "Technical Team",
              members: 4,
              description: "Manages technical aspects of events including websites and systems",
            },
          ],
          events: [
            {
              id: "1",
              name: "National Hackathon 2025",
              date: "May 15-17, 2025",
              status: "Planning",
              progress: 65,
            },
            {
              id: "2",
              name: "AI Workshop Series",
              date: "June 5-10, 2025",
              status: "Planning",
              progress: 25,
            },
          ],
          members: {
            total: 45,
            active: 32,
            leadership: 5,
          },
          achievements: [
            "Best Student Chapter Award 2024",
            "Outstanding Technical Event Award 2023",
            "Community Service Excellence Award 2022",
          ],
          upcomingEvents: [
            {
              name: "Tech Talk Series",
              date: "April 20, 2025",
              speaker: "Dr. Alan Turing, AI Researcher",
            },
            {
              name: "Code Camp",
              date: "April 25-26, 2025",
              description: "Weekend coding bootcamp for beginners",
            },
          ],
        }

        setCommunity(mockCommunity)
      } catch (error) {
        console.error("Error fetching community:", error)
        toast({
          title: "Error",
          description: "Failed to load community details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCommunity()
  }, [params.id, toast])

  if (isLoading || !community) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading community details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="relative rounded-xl overflow-hidden mb-8">
        <img
          src={community.coverImage || "/placeholder.svg"}
          alt={community.name}
          className="w-full h-[200px] md:h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center gap-4">
            <img
              src={community.logo || "/placeholder.svg"}
              alt={community.name + " logo"}
              className="w-20 h-20 rounded-full bg-white p-1"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">{community.name}</h1>
              <p className="text-white/80">{community.fullName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardHeader className="bg-indigo-50 dark:bg-indigo-950">
              <CardTitle className="text-indigo-800 dark:text-indigo-300">About {community.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground whitespace-pre-line">{community.description}</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">College/University</h4>
                    <p className="text-muted-foreground">{community.college}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Established</h4>
                    <p className="text-muted-foreground">{community.established}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-lg">Achievements</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {community.achievements.map((achievement: string, index: number) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-lg">Leadership</h3>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={community.chairperson.avatar} alt={community.chairperson.name} />
                    <AvatarFallback>{community.chairperson.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{community.chairperson.name}</p>
                    <p className="text-sm text-muted-foreground">Chairperson</p>
                    <p className="text-sm text-muted-foreground">{community.chairperson.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="teams" className="space-y-4">
            <TabsList>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>

            <TabsContent value="teams" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Community Teams</h3>
                <Button size="sm" asChild>
                  <Link href={`/communities/${community.id}/teams/create`}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Team
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {community.teams.map((team: any) => (
                  <Card key={team.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{team.name}</CardTitle>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {team.members} Members
                        </Badge>
                      </div>
                      <CardDescription>{team.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/teams/${team.id}`}>View Details</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/teams/${team.id}/manage`}>Manage Team</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Community Events</h3>
                <Button size="sm" asChild>
                  <Link href={`/events/create?community=${community.id}`}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Event
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {community.events.map((event: any) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{event.name}</CardTitle>
                        <Badge
                          variant={
                            event.status === "Planning"
                              ? "secondary"
                              : event.status === "In Progress"
                                ? "default"
                                : "outline"
                          }
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {event.date}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Progress:</span>
                          <span className="text-sm">{event.progress}%</span>
                        </div>
                        <Progress value={event.progress} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/events/${event.id}/manage`}>Manage Event</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              <h3 className="text-lg font-medium">Upcoming Activities</h3>

              <div className="space-y-4">
                {community.upcomingEvents.map((event: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {event.date}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {event.speaker && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Speaker:</strong> {event.speaker}
                        </p>
                      )}
                      {event.description && <p className="text-sm text-muted-foreground mt-2">{event.description}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardHeader className="bg-indigo-50 dark:bg-indigo-950">
              <CardTitle className="text-indigo-800 dark:text-indigo-300">Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{community.members.total}</p>
                    <p className="text-sm text-muted-foreground">Total Members</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{community.members.active}</p>
                    <p className="text-sm text-muted-foreground">Active Members</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{community.teams.length}</p>
                    <p className="text-sm text-muted-foreground">Teams</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Member Activity</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Rate:</span>
                      <span className="text-sm">
                        {Math.round((community.members.active / community.members.total) * 100)}%
                      </span>
                    </div>
                    <Progress value={(community.members.active / community.members.total) * 100} className="h-2" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Contact Information</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${community.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {community.email}
                      </a>
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      <a
                        href={community.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {community.website}
                      </a>
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Social Media</h3>
                  <div className="flex space-x-2">
                    {Object.entries(community.socialMedia).map(([platform, handle]) => (
                      <Button key={platform} variant="outline" size="sm" asChild>
                        <a href={`https://${platform}.com/${handle}`} target="_blank" rel="noopener noreferrer">
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                asChild
              >
                <Link href={`/communities/${community.id}/join`}>Join Community</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/communities/${community.id}/edit`}>
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Community
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/communities/${community.id}/members`}>
                    <Users className="mr-2 h-4 w-4" />
                    Manage Members
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/communities/${community.id}/events`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    View All Events
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

