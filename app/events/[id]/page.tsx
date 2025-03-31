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
import { Calendar, Clock, MapPin, Users, Share2, Heart, MessageSquare, CheckCircle, Download } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState<any>(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    // Simulate fetching event data from API
    const fetchEvent = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/events/${params.id}`);
        // const data = await response.json();

        // Simulated data
        const mockEvent = {
          id: params.id,
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
          statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
          progress: 65,
          image: "/placeholder.svg?height=400&width=800",
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
            { name: "TechCorp", logo: "/placeholder.svg?height=80&width=80", tier: "Platinum" },
            { name: "InnovateSoft", logo: "/placeholder.svg?height=80&width=80", tier: "Gold" },
            { name: "DevWorks", logo: "/placeholder.svg?height=80&width=80", tier: "Gold" },
            { name: "CodeLabs", logo: "/placeholder.svg?height=80&width=80", tier: "Silver" },
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
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "JS",
            },
            {
              name: "Prof. Michael Johnson",
              role: "Technical Advisor",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "MJ",
            },
            {
              name: "Sarah Williams",
              role: "Logistics Coordinator",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "SW",
            },
          ],
        }

        setEvent(mockEvent)
      } catch (error) {
        console.error("Error fetching event:", error)
        toast({
          title: "Error",
          description: "Failed to load event details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [params.id, toast])

  const handleRegister = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      // await fetch(`/api/events/${params.id}/register`, { method: 'POST' });

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsRegistered(true)
      toast({
        title: "Registration successful",
        description: "You have successfully registered for this event.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register for the event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || !event) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative rounded-xl overflow-hidden">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-[300px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <Badge className={event.statusColor + " mb-2 self-start"}>{event.status}</Badge>
              <h1 className="text-3xl font-bold text-white">{event.title}</h1>
              <p className="text-white/80">Organized by {event.organizer}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-3 py-1 rounded-full">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center space-x-2 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 px-3 py-1 rounded-full">
              <Users className="h-4 w-4" />
              <span>
                {event.attendees.registered} / {event.attendees.expected} Registered
              </span>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="prizes">Prizes</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>

                  <div className="mt-6 space-y-4">
                    <h3 className="font-semibold text-lg">Event Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Date</h4>
                          <p className="text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Time</h4>
                          <p className="text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Location</h4>
                          <p className="text-muted-foreground">{event.location}</p>
                          <p className="text-muted-foreground text-sm">{event.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Capacity</h4>
                          <p className="text-muted-foreground">
                            {event.attendees.registered} registered of {event.attendees.capacity} capacity
                          </p>
                          <Progress
                            value={(event.attendees.registered / event.attendees.capacity) * 100}
                            className="h-2 mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="font-semibold text-lg">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {event.requirements.map((req: string, index: number) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="font-semibold text-lg">Organizers</h3>
                    <div className="flex flex-wrap gap-4">
                      {event.organizers.map((organizer: any, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={organizer.avatar} alt={organizer.name} />
                            <AvatarFallback>{organizer.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{organizer.name}</p>
                            <p className="text-xs text-muted-foreground">{organizer.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sponsors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {["Platinum", "Gold", "Silver"].map((tier) => {
                      const tierSponsors = event.sponsors.filter((s: any) => s.tier === tier)
                      if (tierSponsors.length === 0) return null

                      return (
                        <div key={tier} className="space-y-3">
                          <h3 className="font-medium text-sm text-muted-foreground">{tier} Sponsors</h3>
                          <div className="flex flex-wrap gap-6 items-center">
                            {tierSponsors.map((sponsor: any, index: number) => (
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
                          {tier !== "Silver" && <Separator />}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event Schedule</CardTitle>
                  <CardDescription>Detailed schedule for all days of the event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {event.schedule.map((day: any, dayIndex: number) => (
                      <div key={dayIndex} className="space-y-4">
                        <h3 className="font-semibold text-lg text-primary">{day.day}</h3>
                        <div className="space-y-4">
                          {day.items.map((item: any, itemIndex: number) => (
                            <div key={itemIndex} className="flex">
                              <div className="mr-4 flex flex-col items-center">
                                <div className="h-3 w-3 rounded-full bg-primary"></div>
                                {itemIndex < day.items.length - 1 && <div className="h-full w-0.5 bg-border"></div>}
                              </div>
                              <div className="pb-5">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Schedule
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="prizes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prizes & Awards</CardTitle>
                  <CardDescription>What you can win at this event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.prizes.map((prize: any, index: number) => (
                      <div key={index} className="rounded-lg border p-4">
                        <h3 className="font-semibold text-lg">{prize.position}</h3>
                        <p className="text-muted-foreground">{prize.prize}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faqs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.faqs.map((faq: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-semibold">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                        {index < event.faqs.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle>Registration</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Registration Status:</span>
                  <Badge className={event.statusColor}>{event.status}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Registered:</span>
                  <span>
                    {event.attendees.registered} / {event.attendees.expected}
                  </span>
                </div>
                <Progress value={(event.attendees.registered / event.attendees.expected) * 100} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  <p className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Registration closes on May 10, 2025
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              {isRegistered ? (
                <div className="w-full rounded-md bg-green-50 p-3 dark:bg-green-950">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-300">You're registered!</h3>
                      <div className="mt-2 text-sm text-green-700 dark:text-green-400">
                        <p>Check your email for confirmation details and updates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  onClick={handleRegister}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Register Now"}
                </Button>
              )}
              <div className="flex w-full justify-between">
                <Button variant="outline" size="icon" onClick={() => setIsLiked(!isLiked)}>
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/events/${event.id}/chat`}>
                    <MessageSquare className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Teams</CardTitle>
              <CardDescription>Teams working on this event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.teams.map((team: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{team.name}</span>
                      <span className="text-sm text-muted-foreground">{team.members} members</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Task completion:</span>
                      <span>
                        {team.tasks.completed}/{team.tasks.total} tasks
                      </span>
                    </div>
                    <Progress value={(team.tasks.completed / team.tasks.total) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Have questions about this event? Contact the organizers or check the FAQs.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/events/${event.id}/contact`}>Contact Organizers</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

