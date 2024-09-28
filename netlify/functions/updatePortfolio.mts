import { ObjectId } from "mongodb"
import { connectToDatabase } from "../db/index.mts"
import type { Context, HandlerEvent, } from "@netlify/functions"
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
            body: 'Portfolio not provided'
        }
    }

    try {
        const { db } = await connectToDatabase()
        const portfolios = db.collection<Portfolio>('portfolios')

        const body: string = event.body
        const portfolio = JSON.parse(body) as Portfolio

        const { _id, ...updateFields } = portfolio

        const updatePortfolio = {
            $set: updateFields
        }
        const result = await portfolios.updateOne({ _id: new ObjectId(portfolio._id) }, updatePortfolio)

        return {
            statusCode: 200,
            body: JSON.stringify({ message: result }),
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: error.toString(),
        }
    }
}
