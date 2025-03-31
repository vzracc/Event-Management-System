import { MongoClient } from "mongodb"
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/event-management"
const MONGODB_DB = process.env.MONGODB_DB || "event-management"

// Check if the MongoDB URI is defined
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

// Check if the MongoDB DB is defined
if (!MONGODB_DB) {
  throw new Error("Please define the MONGODB_DB environment variable")
}

let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  // If we have cached values, use them
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }
  console.log("MongoDB URI:", MONGODB_URI);

  // Connect to the MongoDB server
  const client = await MongoClient.connect(MONGODB_URI)
  console.log("MongoDB URI:", MONGODB_URI);

  // Get the database
  const db = client.db(MONGODB_DB)

  // Cache the client and db for reuse
  cachedClient = client
  cachedDb = db

  return { client, db }
}

