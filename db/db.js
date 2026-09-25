const mongoose = require("mongoose");
const config = require("../src/config/env");
const logger = require("../src/utils/logger");

async function connectToDB() {
    await mongoose.connect(config.mongoUri, {
        serverSelectionTimeoutMS: 5000,
    });
    logger.info("Connected to MongoDB");
}

module.exports = { mongoose, connectToDB };
