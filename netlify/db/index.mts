import { Db, MongoClient } from "mongodb";
import 'dotenv/config'


const uri = process.env.DB_URI
let cachedClient: null | MongoClient = null
let cachedDb: null | Db = null

export const connectToDatabase = async () => {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb }
    }
    if (!uri) {
        throw new Error('Database connection URI is not defined in environment variables');
    }

    const client = new MongoClient(uri)

    await client.connect()
    const db = client.db('portfolioDB')

    cachedClient = client
    cachedDb = db

    return { client, db }
}