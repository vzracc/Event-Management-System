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
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, Users, Sparkles, Upload, Clock, Building, Globe, Banknote } from "lucide-react"

export default function HostEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call to backend
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Form data would be collected here
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create event")
      }

      toast({
        title: "Event submitted successfully",
        description: "Your event has been submitted for approval.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-purple-800 dark:text-purple-300">Host Your Event</h1>
          <p className="text-muted-foreground">Complete the form below to submit your event for approval</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Event Details</TabsTrigger>
              <TabsTrigger value="logistics">Logistics</TabsTrigger>
              <TabsTrigger value="submission">Submission</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card className="border-teal-200 dark:border-teal-800">
                <CardHeader className="bg-teal-50 dark:bg-teal-950">
                  <CardTitle className="text-teal-800 dark:text-teal-300">Basic Information</CardTitle>
                  <CardDescription>Tell us about your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <SelectItem value="internship">Internship Drive</SelectItem>
                          <SelectItem value="mentorship">Mentorship Program</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-type">Event Type</Label>
                      <RadioGroup defaultValue="college">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="college" id="college" />
                          <Label htmlFor="college">College Event</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="corporate" id="corporate" />
                          <Label htmlFor="corporate">Corporate Event</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-website">Event Website (Optional)</Label>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Input id="event-website" placeholder="https://yourevent.com" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => setActiveTab("details")}
                    className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
                  >
                    Next: Event Details
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card className="border-indigo-200 dark:border-indigo-800">
                <CardHeader className="bg-indigo-50 dark:bg-indigo-950">
                  <CardTitle className="text-indigo-800 dark:text-indigo-300">Event Details</CardTitle>
                  <CardDescription>Provide more specific information about your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <DatePicker />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <DatePicker />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input id="start-time" type="time" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input id="end-time" type="time" required />
                      </div>
                    </div>
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
                  <div className="space-y-2">
                    <Label htmlFor="expected-attendees">Expected Number of Attendees</Label>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Input id="expected-attendees" type="number" min="1" placeholder="e.g., 100" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {["Students", "Faculty", "Industry Professionals", "General Public", "Alumni", "Researchers"].map(
                        (audience) => (
                          <div key={audience} className="flex items-center space-x-2">
                            <Checkbox id={`audience-${audience.toLowerCase().replace(/\s+/g, "-")}`} />
                            <Label htmlFor={`audience-${audience.toLowerCase().replace(/\s+/g, "-")}`}>
                              {audience}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("basic")}>
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("logistics")}
                    className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                  >
                    Next: Logistics
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="logistics" className="space-y-6">
              <Card className="border-amber-200 dark:border-amber-800">
                <CardHeader className="bg-amber-50 dark:bg-amber-950">
                  <CardTitle className="text-amber-800 dark:text-amber-300">Logistics & Requirements</CardTitle>
                  <CardDescription>Venue, resources, and other logistical details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="event-location">Venue Name</Label>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <Input id="event-location" placeholder="e.g., University Auditorium" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-address">Address</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="event-address"
                        placeholder="Full address of the venue"
                        className="min-h-[80px]"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Resources Required</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "Projector",
                        "Sound System",
                        "Microphones",
                        "Tables & Chairs",
                        "Internet Access",
                        "Catering",
                      ].map((resource) => (
                        <div key={resource} className="flex items-center space-x-2">
                          <Checkbox id={`resource-${resource.toLowerCase().replace(/\s+/g, "-")}`} />
                          <Label htmlFor={`resource-${resource.toLowerCase().replace(/\s+/g, "-")}`}>{resource}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimated Budget (in $)</Label>
                    <div className="flex items-center space-x-2">
                      <Banknote className="h-4 w-4 text-muted-foreground" />
                      <Input id="budget" type="number" min="0" placeholder="e.g., 5000" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="special-requirements">Special Requirements or Notes</Label>
                    <Textarea
                      id="special-requirements"
                      placeholder="Any additional requirements or notes for the event"
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveTab("submission")}
                    className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600"
                  >
                    Next: Submission
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="submission" className="space-y-6">
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader className="bg-purple-50 dark:bg-purple-950">
                  <CardTitle className="text-purple-800 dark:text-purple-300">Final Submission</CardTitle>
                  <CardDescription>Upload supporting documents and submit your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="event-poster">Event Poster/Banner (Optional)</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="event-poster-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                        </div>
                        <input id="event-poster-upload" type="file" className="hidden" accept="image/*" />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-documents">Supporting Documents (Optional)</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="event-documents-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX (MAX. 10MB)</p>
                        </div>
                        <input
                          id="event-documents-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          multiple
                        />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                          terms and conditions
                        </a>{" "}
                        and confirm that all information provided is accurate.
                      </Label>
                    </div>
                  </div>
                  <div className="rounded-md bg-purple-50 p-4 dark:bg-purple-950">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Sparkles className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300">
                          AI-Powered Event Management
                        </h3>
                        <div className="mt-2 text-sm text-purple-700 dark:text-purple-400">
                          <p>
                            Once your event is approved, our AI system will help you manage tasks, allocate resources
                            efficiently, and provide real-time analytics to ensure your event's success.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("logistics")}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                  >
                    {isLoading ? "Submitting..." : "Submit Event"}
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

