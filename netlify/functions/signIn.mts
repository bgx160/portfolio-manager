import { HandlerEvent } from "@netlify/functions"
import { connectToDatabase } from "../db/index.mts"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const handler = async (event: HandlerEvent) => {

    if (!event.body) {
        return {
            statusCode: 500,
            message: 'Missing credentials'
        }
    }

    try {
        const { username, password } = JSON.parse(event.body)

        const { db } = await connectToDatabase()
        const collection = db.collection('users')

        const user = await collection.findOne({ username: username })

        if (!user) {
            return {
                statusCode: 500,
                message: 'Invalid credentials'
            }
        }

        const passwordMatch = bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return {
                statusCode: 500,
                message: 'Invalid credentials'
            }
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.SECRET!, {
            expiresIn: '1h'
        })


        return {
            statusCode: 200,
            body: JSON.stringify({ token: token, _id: user._id, username: username }),
        }

    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}