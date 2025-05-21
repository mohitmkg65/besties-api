import { Router } from "express";
import { addFreind, deleteFreind, fetchFreinds, freindRequest, suggestedFreinds, updateFreindStatus } from "../controller/freind.controller";
const FreindRouter = Router()

FreindRouter.post('/', addFreind)
FreindRouter.get('/', fetchFreinds)
FreindRouter.delete('/:id', deleteFreind)
FreindRouter.put('/:id', updateFreindStatus)
FreindRouter.get('/suggestion', suggestedFreinds)
FreindRouter.get('/request', freindRequest)

export default FreindRouter