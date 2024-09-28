import { HandlerEvent } from '@netlify/functions'
import jwt from 'jsonwebtoken'

export const verfifyToken = (event: HandlerEvent) => {
    const authorization = event.headers.authorization
    
    if (authorization) {}
        let token = authorization?.replace('Bearer ', '')

    if (!token) {
        return { statusCode: 403, body: JSON.stringify({ message: "Forbidden" }) }
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        return { statusCode: 200, userId: decoded.userId }
    } catch (error) {
        return { statusCode: 401, body: JSON.stringify({ message: "Unauthorized" }) }
    }
}