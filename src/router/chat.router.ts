import { Router } from "express";
import { fetchChat } from "../controller/chat.controller";
const ChatRouter = Router()

ChatRouter.get('/:to', fetchChat)

export default ChatRouter