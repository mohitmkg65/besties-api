import { NextFunction, Request, Response } from "express"
import { CatchError, TryError } from "../util/error"
import jwt, { JwtPayload } from 'jsonwebtoken'
import mongoose from "mongoose"


export interface PayloadInterface {
    id: mongoose.Types.ObjectId
    fullname: string
    email: string
    mobile: string
    image: string | null
}

export interface SessionInterface extends Request{
    session?: PayloadInterface
}

const AuthMiddleware = async (req: SessionInterface, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken
        if(!accessToken)
            throw TryError("Failed to authorise usersss", 401)

        const payload = await jwt.verify(accessToken, process.env.AUTH_SECRET!) as JwtPayload
        req.session = {
            id: payload.id,
            fullname: payload.fullname,
            email: payload.email,
            mobile: payload.mobile,
            image: payload.image
        }
        next()
    } catch (error) {
        CatchError(error, res, "Failed to authorise user")
    }
}

export default AuthMiddleware