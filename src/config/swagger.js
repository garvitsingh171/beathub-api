const swaggerJsdoc = require("swagger-jsdoc");
const config = require("./env");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BeatHub API",
            version: "1.0.0",
            description: "REST API documentation for BeatHub",
        },
        servers: [
            {
                url: config.swaggerServerUrl || "http://localhost:3000",
                description: "Current server",
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
            schemas: {
                LoginRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", format: "email" },
                        password: { type: "string", minLength: 6 },
                    },
                },
                LoginResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        message: { type: "string" },
                        token: { type: "string" },
                        user: { $ref: "#/components/schemas/User" },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        username: { type: "string" },
                        email: { type: "string", format: "email" },
                        role: { type: "string", enum: ["user", "admin"] },
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
                Artist: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        name: { type: "string" },
                        genre: {
                            type: "string",
                            enum: [
                                "Pop",
                                "Rock",
                                "HipHop",
                                "Jazz",
                                "Electronic",
                            ],
                        },
                        followers: { type: "integer", minimum: 0 },
                        socialLinks: { type: "object" },
                    },
                },
                Album: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        title: { type: "string" },
                        releaseDate: { type: "string", format: "date" },
                        artist: { type: "string" },
                    },
                },
                Song: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        title: { type: "string" },
                        duration: { type: "number", exclusiveMinimum: 0 },
                        artist: { type: "string" },
                        album: { type: "string" },
                    },
                },
                Playlist: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        name: { type: "string" },
                        user: { type: "string" },
                        songs: { type: "array", items: { type: "string" } },
                    },
                },
            },
            parameters: {
                ResourceId: {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string", pattern: "^[a-fA-F0-9]{24}$" },
                },
            },
        },
        paths: {
            "/api/auth/login": {
                post: {
                    summary: "Log in",
                    tags: ["Authentication"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/LoginRequest",
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Authenticated",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/LoginResponse",
                                    },
                                },
                            },
                        },
                        401: { description: "Invalid credentials" },
                    },
                },
            },
            "/api/users": {
                get: {
                    summary: "List users",
                    tags: ["Users"],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: "Users" },
                        401: { description: "Unauthenticated" },
                        403: { description: "Admin required" },
                    },
                },
            },
            "/api/songs": {
                get: {
                    summary: "List songs with cursor pagination",
                    tags: ["Songs"],
                    parameters: [
                        {
                            name: "limit",
                            in: "query",
                            schema: {
                                type: "integer",
                                minimum: 1,
                                maximum: 100,
                            },
                        },
                        {
                            name: "cursor",
                            in: "query",
                            schema: { type: "string" },
                        },
                    ],
                    responses: {
                        200: { description: "Songs" },
                        400: { description: "Invalid pagination input" },
                    },
                },
            },
            "/api/songs/register": {
                post: {
                    summary: "Create song",
                    tags: ["Songs"],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Song" },
                            },
                        },
                    },
                    responses: {
                        201: { description: "Created" },
                        409: { description: "Relationship conflict" },
                    },
                },
            },
            "/api/songs/{id}": {
                patch: {
                    summary: "Update song",
                    tags: ["Songs"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { $ref: "#/components/parameters/ResourceId" },
                    ],
                    responses: { 200: { description: "Updated" } },
                },
                delete: {
                    summary: "Delete song",
                    tags: ["Songs"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { $ref: "#/components/parameters/ResourceId" },
                    ],
                    responses: { 200: { description: "Deleted" } },
                },
            },
            "/api/artist": {
                get: {
                    summary: "List artists",
                    tags: ["Artists"],
                    responses: { 200: { description: "Artists" } },
                },
            },
            "/api/artist/register": {
                post: {
                    summary: "Create artist",
                    tags: ["Artists"],
                    security: [{ bearerAuth: [] }],
                    responses: { 201: { description: "Created" } },
                },
            },
            "/api/artist/{id}": {
                patch: {
                    summary: "Update artist",
                    tags: ["Artists"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { $ref: "#/components/parameters/ResourceId" },
                    ],
                    responses: { 200: { description: "Updated" } },
                },
                delete: {
                    summary: "Delete artist",
                    tags: ["Artists"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { $ref: "#/components/parameters/ResourceId" },
                    ],
                    responses: {
                        200: { description: "Deleted" },
                        409: { description: "Referenced artist" },
                    },
                },
            },
            "/api/album": {
                get: {
                    summary: "List albums",
                    tags: ["Albums"],
                    responses: { 200: { description: "Albums" } },
                },
            },
            "/api/album/register": {
                post: {
                    summary: "Create album",
                    tags: ["Albums"],
                    security: [{ bearerAuth: [] }],
                    responses: { 201: { description: "Created" } },
                },
            },
            "/api/album/{id}": {
                patch: {
                    summary: "Update album",
                    tags: ["Albums"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { $ref: "#/components/parameters/ResourceId" },
                    ],
                    responses: { 200: { description: "Updated" } },
                },
                delete: {
                    summary: "Delete album",
                    tags: ["Albums"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { $ref: "#/components/parameters/ResourceId" },
                    ],
                    responses: {
                        200: { description: "Deleted" },
                        409: { description: "Referenced album" },
                    },
                },
            },
            "/api/playlist": {
                get: {
                    summary: "List playlists",
                    tags: ["Playlists"],
                    responses: { 200: { description: "Playlists" } },
                },
            },
            "/api/playlist/register": {
                post: {
                    summary: "Create playlist",
                    tags: ["Playlists"],
                    security: [{ bearerAuth: [] }],
                    responses: { 201: { description: "Created" } },
                },
            },
            "/api/playlist/{id}": {
                patch: {
                    summary: "Update playlist",
                    tags: ["Playlists"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { $ref: "#/components/parameters/ResourceId" },
                    ],
                    responses: { 200: { description: "Updated" } },
                },
                delete: {
                    summary: "Delete playlist",
                    tags: ["Playlists"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { $ref: "#/components/parameters/ResourceId" },
                    ],
                    responses: { 200: { description: "Deleted" } },
                },
            },
            "/api/analytics/top-users": {
                get: {
                    summary: "Get top users by playlist count",
                    tags: ["Analytics"],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: "Analytics result" },
                        403: { description: "Admin required" },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

const documentedPaths = JSON.parse(JSON.stringify(options.definition.paths));
const swaggerSpec = swaggerJsdoc(options);
swaggerSpec.paths = { ...documentedPaths, ...swaggerSpec.paths };

module.exports = swaggerSpec;
