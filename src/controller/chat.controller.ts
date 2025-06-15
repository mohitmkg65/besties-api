import mongoose from "mongoose"
import ChatModel from "../model/chat.model"
import { Request, Response } from "express"
import { CatchError, TryError } from "../util/error"
import { SessionInterface } from "../middleware/auth.middleware"
import path from "path"
import { downloadObject } from "../util/s3"

interface PayloadInterface {
    from: string
    to: string
    message: string
    file?: {
        path: string
        type: string
    }
}

export const createChat = (payload: PayloadInterface) => {
    ChatModel.create(payload).catch((error) => {
        console.log(error.message)
    })
}

export const fetchChat = async (req:SessionInterface, res:Response) => {
    try {
        if(!req.session)
            throw TryError("Failed to fetch chats")

        const chats = await ChatModel.find({
            $or: [
                {from: req.session.id, to: req.params.to},
                {from: req.params.to, to: req.session.id}
            ]
        }).populate("from", "fullname email mobile").lean()

        const modifiedChats = await Promise.all(
            chats.map(async (item) => {
                if(item.file){
                    return {
                        ...item,
                        file: {
                            path: item.file.path && await downloadObject(item.file.path),
                            type: item.file.type
                        }
                    }
                }
                return item
            })
        )

        res.json({chats: modifiedChats})
    } catch (error) {
        CatchError(error, res, "Failed to fetch chats")
    }
}