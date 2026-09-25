const dotenv = require("dotenv");

dotenv.config();

const nodeEnv = process.env.NODE_ENV || "development";
const port = Number(process.env.PORT || 3000);
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
}

if (!["development", "test", "production"].includes(nodeEnv)) {
    throw new Error("NODE_ENV must be development, test, or production");
}

if (!mongoUri && nodeEnv !== "test") {
    throw new Error("MONGODB_URI or MONGO_URI must be configured");
}

if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error(
        "JWT_SECRET must be configured with at least 32 characters",
    );
}

module.exports = {
    nodeEnv,
    port,
    mongoUri,
    jwtSecret,
    jwtExpiresIn,
    swaggerServerUrl: process.env.SWAGGER_SERVER_URL,
};
