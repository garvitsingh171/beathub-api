const app = require("./app");
require("dotenv").config();
const { connectToDB } = require("../db/db");

const PORT = process.env.PORT || 3000;

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
