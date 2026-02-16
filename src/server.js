const express = require("express");
require("dotenv").config();
const { connectToDB } = require("../db/db");

const app = express();

app.use(express.json());

app.use("/api/users", require("../src/routes/user.route"));

app.use("/api/songs", require("../src/routes/song.route"));

app.use("/api/playlist", require("../src/routes/playlist.route"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

async function start() {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

start();
