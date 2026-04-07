const express = require("express");
const {
    createSongController,
    getSongsCursor,
    updateSongController,
    deleteSongController,
} = require("../controllers/song.controller");

const router = express.Router();

router.post("/register", createSongController);

router.get("/", getSongsCursor);

router.patch("/:id", updateSongController);

router.delete("/:id", deleteSongController);

module.exports = router;