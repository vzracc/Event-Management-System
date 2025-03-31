"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, PlusCircle } from "lucide-react"

export function DashboardEvents() {
  const events = [
    {
      id: 1,
      title: "National Hackathon 2025",
      organizer: "Tech University",
      description: "A 48-hour coding competition to solve real-world problems",
      date: "May 15-17, 2025",
      location: "Tech University Campus",
      attendees: 500,
      category: "Hackathon",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      progress: 65,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "AI Workshop Series",
      organizer: "CSI Community",
      description: "Learn about the latest advancements in artificial intelligence",
      date: "June 5-10, 2025",
      location: "Virtual",
      attendees: 300,
      category: "Workshop",
      status: "Planning",
      statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      progress: 25,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Leadership Summit",
      organizer: "ISTE",
      description: "Develop leadership skills and network with industry leaders",
      date: "July 20-22, 2025",
      location: "Grand Convention Center",
      attendees: 250,
      category: "Conference",
      status: "Planning",
      statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      progress: 10,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Tech Career Fair",
      organizer: "IEEE",
      description: "Connect with top tech companies for internship and job opportunities",
      date: "April 30, 2025",
      location: "University Auditorium",
      attendees: 600,
      category: "Career Fair",
      status: "Almost Complete",
      statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      progress: 90,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Manage Events</h3>
        <Button asChild>
          <Link href="/events/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-48 w-full object-cover" />
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <Badge className={event.statusColor}>{event.status}</Badge>
                  </div>
                  <CardDescription>{event.organizer}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>{event.attendees} Expected Attendees</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/events/${event.id}/manage`}>Manage</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events
              .filter((e) => e.status === "In Progress")
              .map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-48 w-full object-cover" />
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge className={event.statusColor}>{event.status}</Badge>
                    </div>
                    <CardDescription>{event.organizer}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/events/${event.id}/manage`}>Manage</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events
              .filter((e) => e.status === "Planning")
              .map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-48 w-full object-cover" />
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge className={event.statusColor}>{event.status}</Badge>
                    </div>
                    <CardDescription>{event.organizer}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/events/${event.id}/manage`}>Manage</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events
              .filter((e) => e.status === "Almost Complete")
              .map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-48 w-full object-cover" />
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge className={event.statusColor}>{event.status}</Badge>
                    </div>
                    <CardDescription>{event.organizer}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/events/${event.id}/manage`}>Manage</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

