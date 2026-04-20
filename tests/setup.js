const { mongoose } = require("../db/db");
require("dotenv").config();

beforeAll(async () => {
    // Use a separate test database
    const baseUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!baseUri && !process.env.TEST_MONGO_URI) {
        throw new Error("Missing TEST_MONGO_URI and base Mongo URI env vars");
    }
    const TEST_MONGO_URI = process.env.TEST_MONGO_URI || `${baseUri}-test`;
    await mongoose.connect(TEST_MONGO_URI);
    console.log("Connected to test database");
});

afterEach(async () => {
    // Clean up test data after each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});
