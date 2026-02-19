const request = require("supertest");
const app = require("../src/app");

describe("API Endpoints", () => {
    test("It should return Hello, World!", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Hello, World!");
    });
});

describe("User API Endpoints", () => {
    test("It should create a new user", async () => {
        const newUser = {
            username: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
        }

        const response = await request(app).post("/api/users/register").send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("user");
        expect(response.body.user.username).toBe(newUser.username);
        expect(response.body.user.email).toBe(newUser.email);
    });
});
