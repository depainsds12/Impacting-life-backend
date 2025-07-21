const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "JWT Auth API",
            version: "1.0.0",
            description: "A simple API with JWT authentication (Node.js + MongoDB)",
        },
        servers: [
            {
                url: "http://localhost:5000/api",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/docs/swagger-comand.js"], // <- Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
