import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const eventId = params.id
    const userId = session.user.id

    if (!ObjectId.isValid(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Check if event exists
    const event = await db.collection("events").findOne({
      _id: new ObjectId(eventId),
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Check if registration is open
    if (event.status !== "Registration Open") {
      return NextResponse.json({ error: "Registration is not open for this event" }, { status: 400 })
    }

    // Check if user is already registered
    const existingRegistration = await db.collection("registrations").findOne({
      eventId: new ObjectId(eventId),
      userId: userId,
    })

    if (existingRegistration) {
      return NextResponse.json({ error: "You are already registered for this event" }, { status: 400 })
    }

    // Check if event is at capacity
    if (event.attendees.registered >= event.attendees.capacity) {
      return NextResponse.json({ error: "This event has reached its capacity" }, { status: 400 })
    }

    // Create registration
    const registration = {
      eventId: new ObjectId(eventId),
      userId: userId,
      registeredAt: new Date(),
      status: "Confirmed",
    }

    await db.collection("registrations").insertOne(registration)

    // Update event attendee count
    await db.collection("events").updateOne({ _id: new ObjectId(eventId) }, { $inc: { "attendees.registered": 1 } })

    return NextResponse.json({
      message: "Registration successful",
      registration,
    })
  } catch (error) {
    console.error("Error registering for event:", error)
    return NextResponse.json({ error: "Failed to register for event" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const eventId = params.id
    const userId = session.user.id

    if (!ObjectId.isValid(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Delete registration
    const result = await db.collection("registrations").deleteOne({
      eventId: new ObjectId(eventId),
      userId: userId,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 })
    }

    // Update event attendee count
    await db.collection("events").updateOne({ _id: new ObjectId(eventId) }, { $inc: { "attendees.registered": -1 } })

    return NextResponse.json({
      message: "Registration cancelled successfully",
    })
  } catch (error) {
    console.error("Error cancelling registration:", error)
    return NextResponse.json({ error: "Failed to cancel registration" }, { status: 500 })
  }
}

