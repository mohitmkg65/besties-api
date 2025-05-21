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
    ]
}

export default SwaggerConfig