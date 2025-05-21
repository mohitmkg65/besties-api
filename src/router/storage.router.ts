import { Router } from "express";
import { downloadFile, uploadFile } from "../controller/storage.controller";

const storageRouter = Router()
storageRouter.post('/download', downloadFile)
storageRouter.post('/upload', uploadFile)

export default storageRouter