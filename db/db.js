const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

async function connectToDB() {
    try {
        if (!MONGO_URI) {
            throw new Error("MongoDB URI is missing. Set MONGODB_URI or MONGO_URI.");
        }
        await mongoose.connect(MONGO_URI);
        console.log("Connected Successfully to the database");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

module.exports = { mongoose, connectToDB };
