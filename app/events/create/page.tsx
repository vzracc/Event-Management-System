"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Sparkles } from "lucide-react"

export default function CreateEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate event creation
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Event created successfully",
        description: "Your event has been created and is now ready for task assignment.",
      })
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create a New Event</h1>
          <p className="text-muted-foreground">Fill in the details to create your event and start assigning tasks</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Event Details</TabsTrigger>
              <TabsTrigger value="teams">Team Assignment</TabsTrigger>
              <TabsTrigger value="tasks">Task Creation</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details of your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input id="event-title" placeholder="e.g., National Hackathon 2025" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea
                      id="event-description"
                      placeholder="Describe your event in detail"
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="competition">Competition</SelectItem>
                          <SelectItem value="career-fair">Career Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-community">Hosting Community</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select community" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csi">CSI</SelectItem>
                          <SelectItem value="iste">ISTE</SelectItem>
                          <SelectItem value="tsdw">TSDW</SelectItem>
                          <SelectItem value="ieee">IEEE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Date and Location</CardTitle>
                  <CardDescription>When and where will your event take place?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <DatePicker />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <DatePicker />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-location">Location</Label>
                    <Input id="event-location" placeholder="e.g., University Auditorium" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-address">Address</Label>
                    <Textarea
                      id="event-address"
                      placeholder="Full address of the venue"
                      className="min-h-[80px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-mode">Event Mode</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button">
                    Save as Draft
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("teams")}>
                    Next: Team Assignment
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="teams" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Assignment</CardTitle>
                  <CardDescription>Select which teams will be involved in this event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 1, name: "PR Team", community: "CSI", members: 3 },
                      { id: 2, name: "Technical Team", community: "CSI", members: 4 },
                      { id: 3, name: "Creative Team", community: "ISTE", members: 3 },
                      { id: 4, name: "Logistics Team", community: "TSDW", members: 3 },
                    ].map((team) => (
                      <div key={team.id} className="flex items-center space-x-4 rounded-md border p-4">
                        <input
                          type="checkbox"
                          id={`team-${team.id}`}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <div className="flex-1">
                          <label htmlFor={`team-${team.id}`} className="font-medium cursor-pointer">
                            {team.name}
                          </label>
                          <p className="text-sm text-muted-foreground">
                            {team.community} • {team.members} members
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Sparkles className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          AI-Driven Task Allocation
                        </h3>
                        <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                          <p>
                            Our AI system will automatically assign tasks to teams based on their current workload,
                            skills, and availability. You can review and adjust these assignments in the next step.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("tasks")}>
                    Next: Task Creation
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Task Creation</CardTitle>
                  <CardDescription>Create tasks for your event (these will be assigned to teams by AI)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="rounded-md border p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`task-title-${index}`}>Task Title</Label>
                            <Input id={`task-title-${index}`} placeholder="e.g., Design event poster" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`task-priority-${index}`}>Priority</Label>
                            <Select>
                              <SelectTrigger id={`task-priority-${index}`}>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Label htmlFor={`task-description-${index}`}>Description</Label>
                          <Textarea
                            id={`task-description-${index}`}
                            placeholder="Describe the task in detail"
                            className="min-h-[80px]"
                          />
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Due Date</Label>
                            <DatePicker />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`task-team-type-${index}`}>Team Type</Label>
                            <Select>
                              <SelectTrigger id={`task-team-type-${index}`}>
                                <SelectValue placeholder="Select team type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pr">PR Team</SelectItem>
                                <SelectItem value="technical">Technical Team</SelectItem>
                                <SelectItem value="creative">Creative Team</SelectItem>
                                <SelectItem value="logistics">Logistics Team</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button type="button" variant="outline" className="w-full">
                    + Add Another Task
                  </Button>

                  <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Sparkles className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">AI Task Assignment</h3>
                        <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                          <p>
                            Our AI will analyze these tasks and assign them to the most appropriate team members based
                            on their skills, current workload, and availability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("teams")}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating Event..." : "Create Event"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  )
}

