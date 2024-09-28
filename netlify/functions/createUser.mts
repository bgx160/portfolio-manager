import { connectToDatabase } from "../db/index.mts"
import type { HandlerEvent, } from "@netlify/functions"
import bcrypt from 'bcrypt'

export const handler = async (event: HandlerEvent) => {

    if (!event.body) {
        return {
            statusCode: 500,
            body: 'User details not provided'
        }
    }
    try {
        const {username, password} = JSON.parse(event.body)
        const { db } = await connectToDatabase()

        const users = db.collection('users')

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {username: username, password: hashedPassword}

        const result = await users.insertOne(newUser)

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `User created with id ${result.insertedId}` }),
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: error.toString(),
        }
    }
}
