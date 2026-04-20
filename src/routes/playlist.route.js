const express = require("express");
const validateRequest = require("../middlewares/validate.middleware");

const router = express.Router();

const {
    createPlaylistController,
    getAllPlaylistController,
    updatePlaylistController,
    deletePlaylistController,
} = require("../controllers/playlist.controller");
const {
    createPlaylistValidation,
    updatePlaylistValidation,
    deletePlaylistValidation,
} = require("../validators/playlist.validator");

router.post("/register", createPlaylistValidation, validateRequest, createPlaylistController);

router.get("/", getAllPlaylistController);

router.patch("/:id", updatePlaylistValidation, validateRequest, updatePlaylistController);

router.delete("/:id", deletePlaylistValidation, validateRequest, deletePlaylistController);

module.exports = router;
