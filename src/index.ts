import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB!)

import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import cookieParser from 'cookie-parser'
import AuthRouter from "./router/auth.router"
import storageRouter from "./router/storage.router"
import AuthMiddleware from "./middleware/auth.middleware"
import FreindRouter from "./router/freind.router"
import SwaggerConfig from "./util/swagger"
import { serve, setup } from "swagger-ui-express"

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT,
        credentials: true
    }
})

server.listen(process.env.PORT || 8080, () => console.log(`server is running on ${process.env.PORT}`) )

io.on("connection", (client) => {
    console.log("User connected")
})

app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api-docs', serve, setup(SwaggerConfig))
app.use('/auth', AuthRouter)
app.use('/storage', AuthMiddleware, storageRouter)
app.use('/freind', AuthMiddleware, FreindRouter)