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
import StatusSocket from "./socket/status.socket"
import CorsConfig from "./util/cors"

// Express server
const app = express()
const server = createServer(app)
server.listen(process.env.PORT || 8080, () => console.log(`server is running on ${process.env.PORT}`) )

// Socket connections
const io  = new Server(server, {cors: CorsConfig})
StatusSocket(io)

// Middlewares
app.use(cors(CorsConfig))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// End points
app.use('/api-docs', serve, setup(SwaggerConfig))
app.use('/auth', AuthRouter)
app.use('/storage', AuthMiddleware, storageRouter)
app.use('/freind', AuthMiddleware, FreindRouter)