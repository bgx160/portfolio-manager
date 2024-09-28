import { connectToDatabase } from "../db/index.mts"
import { ObjectId } from "mongodb"
import { HandlerEvent } from "@netlify/functions"
import { verfifyToken } from "./verifyJwtToken.mts"

interface Portfolio {
    _id: ObjectId
    name: string
    content?: {
        skills?: string
        about?: string
        projects: any[] | null
    }
}

export const handler = async (event: HandlerEvent) => {

    const tokenCheck = verfifyToken(event)

    if (tokenCheck.statusCode !== 200) {
        return tokenCheck
    }

    if (!event.body) {
        return {
            statusCode: 500,
            body: 'Id not provided'
        }
    }

    try {
        const { db } = await connectToDatabase()
        const portfolios = db.collection<Portfolio>('portfolios')

        const body: string = event.body
        const bodyJson = JSON.parse(body)

        const result = await portfolios.deleteOne({ _id: new ObjectId(bodyJson) })

        return {
            statusCode: 200,
            body: JSON.stringify({ message: result.deletedCount === 1 ? 'Portfolio deleted successfully' : 'Portfolio not found' }),
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: error.toString(),
        }
    }
}
