import { HandlerEvent } from "@netlify/functions"
import { connectToDatabase } from "../db/index.mts"
import { ObjectId } from "mongodb"

export const handler = async (event: HandlerEvent) => {
    try {
        const { id } = event.queryStringParameters || {}

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing id parameter' }),
            }
        }

        const { db } = await connectToDatabase()
        const collection = db.collection('portfolios')

        const results = await collection.find({ _id: new ObjectId(id), published: true }).toArray()

        return {
            statusCode: 200,
            body: JSON.stringify(results),
        }

    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}