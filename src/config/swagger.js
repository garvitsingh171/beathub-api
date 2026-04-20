const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BeatHub API",
            version: "1.0.0",
            description: "Production-ready CRUD API documentation for BeatHub",
        },
        servers: [
            {
                url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000",
                description: "Current server",
            },
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        username: { type: "string" },
                        email: { type: "string", format: "email" },
                        likedSongs: {
                            type: "array",
                            items: { type: "string" },
                        },
                    },
                },
                UserCreateRequest: {
                    type: "object",
                    required: ["username", "email", "password"],
                    properties: {
                        username: { type: "string", minLength: 3 },
                        email: { type: "string", format: "email" },
                        password: { type: "string", minLength: 6 },
                    },
                },
                UserUpdateRequest: {
                    type: "object",
                    properties: {
                        username: { type: "string", minLength: 3 },
                        email: { type: "string", format: "email" },
                        password: { type: "string", minLength: 6 },
                    },
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        message: { type: "string" },
                        errors: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    field: { type: "string" },
                                    message: { type: "string" },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
