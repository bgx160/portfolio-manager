import { connectToDatabase } from "../db/index.mts"
import type { HandlerEvent, } from "@netlify/functions"
import { verfifyToken } from "./verifyJwtToken.mts"

interface Portfolio {
    name: string
    published: boolean
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
        const portfolios = db.collection('portfolios')

        const body: string = event.body
        let portfolio = JSON.parse(body) as Portfolio
        portfolio = { ...portfolio, published: false, content: { skills: '', about: '', projects: null } }

        portfolios.insertOne(portfolio)

        return {
            statusCode: 200,
            body: JSON.stringify({ message: portfolio }),
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: error.toString(),
        }
    }
}
