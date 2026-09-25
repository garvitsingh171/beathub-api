const config = require("./config/env");
const app = require("./app");
const { connectToDB } = require("../db/db");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

let server;

async function start() {
    try {
        await connectToDB();
        server = app.listen(config.port, () => {
            logger.info({ port: config.port }, "BeatHub API started");
        });
    } catch (error) {
        logger.error({ err: error }, "Failed to start server");
        process.exit(1);
    }
}

async function shutdown(signal) {
    logger.info({ signal }, "Shutdown requested");

    if (server) {
        await new Promise((resolve) => server.close(resolve));
    }

    await mongoose.connection.close();
    process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

start();
