const express = require("express");

const router = express.Router();

const {
    createPlaylistController,
    getAllPlaylistController,
    updatePlaylistController,
    deletePlaylistController,
} = require("../controllers/playlist.controller");

router.post("/register", createPlaylistController);

router.get("/", getAllPlaylistController);

router.patch("/:id", updatePlaylistController);

router.delete("/:id", deletePlaylistController);

module.exports = router;
