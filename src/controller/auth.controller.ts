import { Request, Response } from "express";
import AuthModel from "../model/auth.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CatchError, TryError } from "../util/error";
import { PayloadInterface, SessionInterface } from "../middleware/auth.middleware";
import { downloadObject } from "../util/s3";
import {v4 as uuid} from 'uuid'
import moment from "moment";

const accessTokenExpiry = '10m'
const tenMinuteInMs = (10*60)*1000
const sevenDaysInMs = (7*24*60*60)*1000
type tokenType = 'at' | 'rt'

const generateToken = (payload: PayloadInterface) => {
    const accessToken = jwt.sign(payload, process.env.AUTH_SECRET!, {expiresIn: accessTokenExpiry})
    const refreshToken = uuid()
    return {
        accessToken,
        refreshToken
    }
}

const getOptions = (tokenType: tokenType) => {
    return {
        httpOnly: true,
        maxAge: (tokenType === 'at' ? tenMinuteInMs : sevenDaysInMs),
        secure: false,
        domain: 'localhost'
    }
}

export const signup = async (req : Request, res : Response) => {
    try {
        await AuthModel.create(req.body)
        res.json({message: "Signup success"})
    } catch (error: unknown) {
        if(error instanceof Error)
            res.status(500).json({message: error.message})
    }
}

export const login = async(req : Request, res : Response) => {
    try {
        const {email, password} = req.body
        const user = await AuthModel.findOne({email})
    
        if(!user)
            throw TryError("User not found, please try to signup first", 404)

        const isLogin = await bcrypt.compare(password, user.password)
        if(!isLogin)
            throw TryError("Invalid credentials email or password incorrect", 401)

        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            image: user.image
        }

        const {accessToken, refreshToken} = generateToken(payload)
        await AuthModel.updateOne({_id: user.id}, {$set: {
            refreshToken,
            expiry: moment().add(7, 'days').toDate()
        }})
        const options = {
            httpOnly: true,
            maxAge: (10*60)*1000,
            secure: false,
            domain: 'localhost'
        }
        res.cookie("accessToken", accessToken, getOptions('at'))
        res.cookie("refreshToken", refreshToken, getOptions('rt'))
        res.json({message: "Login success"})

    } catch (error: unknown) {
        CatchError(error, res, "Some thing went ewong")
    }
}

export const refreshToken = async (req : SessionInterface, res : Response) => {
    try {
        if(!req.session)
            throw TryError("Failed to refresh token", 401)

        const {accessToken, refreshToken} = generateToken(req.session)
        await AuthModel.updateOne({_id: req.session.id}, {$set: {
            refreshToken,
            expiry: moment().add(7, 'days').toDate()
        }})

        res.cookie("accessToken", accessToken, getOptions('at'))
        res.cookie("refreshToken", refreshToken, getOptions('rt'))
        res.json({message: "Token refreshed"})
    } catch (error: unknown) {
        CatchError(error, res, "Failed to refresh token")
    }
}

export const getSession = async (req : Request, res : Response) => {
    try {
        const accessToken = req.cookies.accessToken
        if(!accessToken)
            throw TryError("Invalid session", 401)
        const session = await jwt.verify(accessToken, process.env.AUTH_SECRET!)
        res.json(session)
    } catch (error: unknown) {
        CatchError(error, res, "Invalid session")
    }
}

export const updateProfilePicture = async (req : SessionInterface, res : Response) => {
    try {
        const path = `${process.env.S3_URL}/${req.body.path}`
        if(!path || !req.session)
            TryError("Failed to update profile picture", 400)

        await AuthModel.updateOne({_id: req.session?.id}, {$set: {image: path}})
        res.json({image: path})
    } catch (error: unknown) {
        CatchError(error, res, "Failed to update profile picture")
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        const options = {
            httpOnly: true,
            maxAge: 0,
            secure: false,
            domain: 'localhost'
        }
        res.clearCookie("accessToken", options)
        res.clearCookie("refreshToken", options)
        res.send({message: "Logout success"})
    } catch (error) {
        CatchError(error, res, "Failed to logout")
    }
}