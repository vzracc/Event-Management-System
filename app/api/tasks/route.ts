import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get("eventId")
    const teamId = searchParams.get("teamId")
    const status = searchParams.get("status")
    const assignedTo = searchParams.get("assignedTo")

    const { db } = await connectToDatabase()

    // Build query based on filters
    const query: any = {}

    if (eventId && ObjectId.isValid(eventId)) {
      query.eventId = new ObjectId(eventId)
    }

    if (teamId && ObjectId.isValid(teamId)) {
      query.teamId = new ObjectId(teamId)
    }

    if (status) {
      query.status = status
    }

    // If assignedTo=me, filter by current user
    if (assignedTo === "me") {
      query.assignedToId = session.user.id
    } else if (assignedTo && ObjectId.isValid(assignedTo)) {
      query.assignedToId = assignedTo
    }

    // Get tasks
    const tasks = await db.collection("tasks").find(query).sort({ dueDate: 1 }).toArray()

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Check if user has permission to create tasks
    if (!["admin", "chairperson"].includes(session.user.role)) {
      return NextResponse.json({ error: "You do not have permission to create tasks" }, { status: 403 })
    }

    const taskData = await request.json()

    // Validate required fields
    if (!taskData.title || !taskData.eventId || !taskData.teamId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Convert string IDs to ObjectIds
    if (taskData.eventId && ObjectId.isValid(taskData.eventId)) {
      taskData.eventId = new ObjectId(taskData.eventId)
    }

    if (taskData.teamId && ObjectId.isValid(taskData.teamId)) {
      taskData.teamId = new ObjectId(taskData.teamId)
    }

    // Add timestamps and default values
    const newTask = {
      ...taskData,
      createdBy: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: taskData.status || "Not Started",
      aiAssigned: taskData.aiAssigned || false,
      completed: false,
    }

    const result = await db.collection("tasks").insertOne(newTask)

    return NextResponse.json(
      {
        message: "Task created successfully",
        taskId: result.insertedId,
        task: newTask,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}

