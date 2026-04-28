const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const { notFoundHandler, globalErrorHandler } = require("./middlewares/error.middleware");
const apiRateLimiter = require("./middlewares/rateLimit.middleware");

const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use("/api", apiRateLimiter);

app.use("/api/auth", require("../src/routes/auth.route"));
app.use("/api/users", require("../src/routes/user.route"));
app.use("/api/songs", require("../src/routes/song.route"));
app.use("/api/playlist", require("../src/routes/playlist.route"));
app.use('/api/artist', require('../src/routes/artist.route'));
app.use('/api/album', require("../src/routes/album.route"));
app.use("/api/analytics", require("../src/routes/analytics.route"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "BeatHub API is running",
        docs: "/api-docs",
    });
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;