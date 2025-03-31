"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Send, Bot, User, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EventChatPage() {
  const params = useParams()
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [eventTitle, setEventTitle] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch event details
    const fetchEventDetails = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/events/${params.id}`);
        // const data = await response.json();

        // Simulated data
        setEventTitle("National Hackathon 2025")

        // Add welcome message
        setChatHistory([
          {
            role: "assistant",
            content:
              "👋 Hello! I'm your AI assistant for the National Hackathon 2025. How can I help you today? You can ask me about event details, registration, schedule, or any other questions you might have.",
            timestamp: new Date().toISOString(),
          },
        ])
      } catch (error) {
        console.error("Error fetching event details:", error)
        toast({
          title: "Error",
          description: "Failed to load event details. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchEventDetails()
  }, [params.id, toast])

  useEffect(() => {
    // Scroll to bottom when chat history updates
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    const userMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    }

    setChatHistory((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    try {
      // Send message to AI chatbot API
      const response = await fetch("/api/ai/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          eventId: params.id,
          chatHistory,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot")
      }

      const data = await response.json()

      // Add AI response to chat history
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          timestamp: new Date().toISOString(),
        },
      ])
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })

      // Add error message to chat history
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href={`/events/${params.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Event
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Event Assistant</h1>
          <p className="text-muted-foreground">Chat with our AI assistant about {eventTitle}</p>
        </div>

        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader className="bg-purple-50 dark:bg-purple-950 px-4 py-3">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 bg-purple-700">
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm text-purple-800 dark:text-purple-300">Event Assistant</CardTitle>
                <CardDescription className="text-xs">AI-powered help</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto p-4">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                  <div
                    className={`flex ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}
                  >
                    <Avatar className={`h-8 w-8 ${msg.role === "user" ? "bg-blue-600" : "bg-purple-700"}`}>
                      {msg.role === "user" ? (
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : msg.isError
                            ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="flex flex-row items-start gap-2 max-w-[80%]">
                    <Avatar className="h-8 w-8 bg-purple-700">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-purple-600 animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]"></div>
                        <div className="h-2 w-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="p-3">
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !message.trim()}
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

