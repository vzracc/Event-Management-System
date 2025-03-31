import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const communityId = searchParams.get("communityId")
    const eventId = searchParams.get("eventId")

    const { db } = await connectToDatabase()

    // Build query based on filters
    const query: any = {}

    if (communityId && ObjectId.isValid(communityId)) {
      query.communityId = new ObjectId(communityId)
    }

    // Get teams
    const teams = await db.collection("teams").find(query).toArray()

    // If eventId is provided, get team task stats for the event
    if (eventId && ObjectId.isValid(eventId)) {
      const eventObjectId = new ObjectId(eventId)

      // For each team, get task stats
      for (const team of teams) {
        const taskStats = await db
          .collection("tasks")
          .aggregate([
            {
              $match: {
                teamId: team._id,
                eventId: eventObjectId,
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: 1 },
                completed: {
                  $sum: {
                    $cond: [{ $eq: ["$completed", true] }, 1, 0],
                  },
                },
                overdue: {
                  $sum: {
                    $cond: [
                      {
                        $and: [{ $eq: ["$completed", false] }, { $lt: ["$dueDate", new Date()] }],
                      },
                      1,
                      0,
                    ],
                  },
                },
              },
            },
          ])
          .toArray()

        team.tasks = taskStats.length > 0 ? taskStats[0] : { total: 0, completed: 0, overdue: 0 }
      }
    }

    return NextResponse.json({ teams })
  } catch (error) {
    console.error("Error fetching teams:", error)
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Check if user has permission to create teams
    if (!["admin", "chairperson"].includes(session.user.role)) {
      return NextResponse.json({ error: "You do not have permission to create teams" }, { status: 403 })
    }

    const teamData = await request.json()

    // Validate required fields
    if (!teamData.name || !teamData.communityId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Convert string IDs to ObjectIds
    if (teamData.communityId && ObjectId.isValid(teamData.communityId)) {
      teamData.communityId = new ObjectId(teamData.communityId)
    }

    // Add timestamps and default values
    const newTeam = {
      ...teamData,
      createdBy: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      members: teamData.members || [],
    }

    const result = await db.collection("teams").insertOne(newTeam)

    return NextResponse.json(
      {
        message: "Team created successfully",
        teamId: result.insertedId,
        team: newTeam,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating team:", error)
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 })
  }
}

