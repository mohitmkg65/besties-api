import { Request, Response } from "express";
import { CatchError, TryError } from "../util/error";
import FreindModel from "../model/freind.model";
import { SessionInterface } from "../middleware/auth.middleware";
import AuthModel from "../model/auth.model";
import mongoose from "mongoose";

export const addFreind = async (req: SessionInterface, res: Response) => {
    try {
        req.body.user = req.session?.id
        await FreindModel.create(req.body)
        res.json({message: "Freind request sent"})
    } catch (error) {
        CatchError(error, res, 'Failed to send freind request')
    }
}

export const fetchFreinds = async (req: SessionInterface, res: Response) => {
    try {
        const user = req.session?.id
        const freinds = await FreindModel.find({user}).populate('freind')
        res.json(freinds)
    } catch (error) {
        CatchError(error, res, 'Failed to send freind request')
    }
}

export const deleteFreind = async (req: Request, res: Response) => {
    try {
        const freinds = await FreindModel.deleteOne({_id: req.params.id})
        res.json({message: "Freind deleted"})
    } catch (error) {
        CatchError(error, res, 'Failed to send freind request')
    }
}

export const suggestedFreinds = async (req: SessionInterface, res: Response) => {
    try {
        if(!req.session)
            throw TryError("Failed to suggest freind", 401)

        const freinds = await AuthModel.aggregate([
            {
                $match: {
                    _id: {$ne: new mongoose.Types.ObjectId(req.session.id)}
                }
            },
            {$sample: {size: 5}},
            {$project: {fullname: 1, image: 1, createdAt: 1}}
        ])

        const modified = await Promise.all(
            freinds.map(async (item) => {
                const count = await FreindModel.countDocuments({freind: item._id})
                return count === 0 ? item : null
            })
        )

        const filtered = modified.filter((item) => item !== null)
        res.json(filtered)
    } catch (error) {
        CatchError(error, res, 'Failed to send freind request')
    }
}

export const freindRequest = async (req: SessionInterface, res: Response) => {
    try {
        if(!req.session)
            throw TryError("Failded to fetch freind request")

        const freinds = await FreindModel.find({freind: req.session.id, status: "requested"}).populate('user', 'fullname image')
        res.send(freinds)
    } catch (error) {
        CatchError(error, res, 'Failed to fetch freind request')
    }
}

export const updateFreindStatus = async (req: SessionInterface, res: Response) => {
    try {
        if(!req.session)
            throw TryError("Failded to update freind status")

        await FreindModel.updateOne({_id: req.params.id}, {$set: {status: req.body.status}})
        res.send({message: "Freind status updated"})
    } catch (error) {
        CatchError(error, res, 'Failed to fetch freind request')
    }
}