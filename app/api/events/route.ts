import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const { db } = await connectToDatabase()

    // Build query based on filters
    const query: any = {}
    if (category) query.category = category
    if (status) query.status = status

    // Get total count for pagination
    const total = await db.collection("events").countDocuments(query)

    // Get events with pagination
    const events = await db
      .collection("events")
      .find(query)
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      events,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const eventData = await request.json()

    // Validate required fields
    if (!eventData.title || !eventData.date || !eventData.organizer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Add timestamps and default values
    const newEvent = {
      ...eventData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: eventData.status || "Draft",
      attendees: {
        registered: 0,
        expected: eventData.attendees?.expected || 0,
        capacity: eventData.attendees?.capacity || 0,
      },
    }

    const result = await db.collection("events").insertOne(newEvent)

    return NextResponse.json(
      {
        message: "Event created successfully",
        eventId: result.insertedId,
        event: newEvent,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}

