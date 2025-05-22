import AuthApiDoc from "../swagger/auth.swagger"
import FreindApiDoc from "../swagger/freind.swagger"
import StorageApiDoc from "../swagger/storage.swagger"

const SwaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "Besties official api",
        description: "All the private and public apis listed here",
        version: "1.0.0",
        contact: {
            name: "Mohit Gupta",
            email: "ermohit@gmail.com"
        }
    },
    servers: [
        {url: process.env.SERVER}
    ],
    paths: {
        ...AuthApiDoc,
        ...StorageApiDoc,
        ...FreindApiDoc
    }
}

export default SwaggerConfig