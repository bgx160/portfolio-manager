import { HandlerEvent } from "@netlify/functions"
import { connectToDatabase } from "../db/index.mts"
import { verfifyToken } from "./verifyJwtToken.mts"

export const handler = async (event: HandlerEvent) => {
    const tokenCheck = verfifyToken(event)

    if (tokenCheck.statusCode !== 200) {
        return tokenCheck
    }

    try {

        const { userId } = event.queryStringParameters || {}

        if (!userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing userId parameter' }),
            }
        }

        const { db } = await connectToDatabase()
        const collection = db.collection('portfolios')

        const results = await collection.find({ ownerId: userId }).toArray()
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}