import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { message, eventId, chatHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Get event details if eventId is provided
    let eventContext = ""
    if (eventId && ObjectId.isValid(eventId)) {
      const event = await db.collection("events").findOne({
        _id: new ObjectId(eventId),
      })

      if (event) {
        eventContext = `
          Event: ${event.title}
          Date: ${event.date}
          Location: ${event.location}
          Description: ${event.description}
        `
      }
    }

    // Format chat history for the AI
    const formattedHistory = chatHistory
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    // Create system prompt with event context
    const systemPrompt = `
      You are an AI assistant for a college event management platform. 
      Your role is to help users with questions about events, registration, and other platform features.
      ${eventContext ? `\nHere are details about the current event:\n${eventContext}` : ""}
      
      Be helpful, concise, and friendly. If you don't know the answer to a specific question about an event detail not provided, 
      suggest that the user contact the event organizers directly.
    `

    // Generate AI response
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: `${formattedHistory}\nUser: ${message}\nAssistant:`,
    })

    // Save the conversation to the database
    await db.collection("chatMessages").insertOne({
      userId: session.user.id,
      eventId: eventId ? new ObjectId(eventId) : null,
      message,
      response: text,
      timestamp: new Date(),
    })

    return NextResponse.json({
      response: text,
    })
  } catch (error) {
    console.error("Error in AI chatbot:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

