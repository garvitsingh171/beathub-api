const request = require("supertest");
const app = require("../src/app");
const User = require("../models/User");

const password = "Password@123";

async function createUser(role = "user") {
    return User.create({
        username: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        email: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}@example.com`,
        password,
        role,
    });
}

async function login(user) {
    const response = await request(app)
        .post("/api/auth/login")
        .send({ email: user.email, password });
    return response.body.token;
}

describe("API Endpoints", () => {
    test("It should return API health payload", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty(
            "message",
            "BeatHub API is running",
        );
    });
});

describe("User API Endpoints", () => {
    test("It should create a new user", async () => {
        const newUser = {
            username: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
        };

        const response = await request(app)
            .post("/api/users/register")
            .send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("user");
        expect(response.body.user.username).toBe(newUser.username);
        expect(response.body.user.email).toBe(newUser.email);
    });

    test("rejects duplicate email with conflict", async () => {
        const user = await createUser();
        const response = await request(app).post("/api/users/register").send({
            username: "another-user",
            email: user.email,
            password,
        });
        expect(response.status).toBe(409);
        expect(response.body.error.code).toBe("DUPLICATE_RESOURCE");
    });

    test("does not allow user updates to change role", async () => {
        const admin = await createUser("admin");
        const user = await createUser();
        const response = await request(app)
            .patch(`/api/users/${user._id}`)
            .set("Authorization", `Bearer ${await login(admin)}`)
            .send({ role: "admin", username: "updated-user" });
        expect(response.status).toBe(200);
        expect(response.body.user.role).toBe("user");
    });
});

describe("Authentication and authorization", () => {
    test("returns 401 for missing and invalid tokens", async () => {
        expect((await request(app).get("/api/users")).status).toBe(401);
        expect(
            (
                await request(app)
                    .get("/api/users")
                    .set("Authorization", "Bearer invalid")
            ).status,
        ).toBe(401);
    });

    test("returns 403 when a regular user accesses an admin route", async () => {
        const user = await createUser();
        const response = await request(app)
            .get("/api/users")
            .set("Authorization", `Bearer ${await login(user)}`);
        expect(response.status).toBe(403);
    });

    test("returns a token and never returns the password", async () => {
        const user = await createUser();
        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: user.email.toUpperCase(), password });
        expect(response.status).toBe(200);
        expect(response.body.token).toEqual(expect.any(String));
        expect(response.body.user.password).toBeUndefined();
    });
});

describe("Song API", () => {
    test("rejects invalid limits and cursors", async () => {
        expect((await request(app).get("/api/songs?limit=0")).status).toBe(400);
        expect(
            (await request(app).get("/api/songs?cursor=not-base64-id")).status,
        ).toBe(400);
    });

    test("requires existing artist and album relationships", async () => {
        const admin = await createUser("admin");
        const token = await login(admin);
        const mongoose = require("mongoose");
        const response = await request(app)
            .post("/api/songs/register")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Valid Song",
                duration: 180,
                artist: new mongoose.Types.ObjectId().toString(),
            });
        expect(response.status).toBe(404);
    });
});

describe("Analytics and errors", () => {
    test("protects analytics for admins", async () => {
        const user = await createUser();
        const admin = await createUser("admin");
        expect(
            (
                await request(app)
                    .get("/api/analytics/top-users")
                    .set("Authorization", `Bearer ${await login(user)}`)
            ).status,
        ).toBe(403);
        const response = await request(app)
            .get("/api/analytics/top-users")
            .set("Authorization", `Bearer ${await login(admin)}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
    });

    test("returns a predictable 404 error", async () => {
        const response = await request(app).get("/api/does-not-exist");
        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({
            success: false,
            error: { code: "REQUEST_ERROR" },
        });
    });
});
