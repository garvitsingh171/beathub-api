const express = require("express");
const validateRequest = require("../middlewares/validate.middleware");
const {
    createSongController,
    getSongsCursor,
    updateSongController,
    deleteSongController,
} = require("../controllers/song.controller");
const {
    createSongValidation,
    updateSongValidation,
    deleteSongValidation,
} = require("../validators/song.validator");

const router = express.Router();

router.post("/register", createSongValidation, validateRequest, createSongController);

router.get("/", getSongsCursor);

router.patch("/:id", updateSongValidation, validateRequest, updateSongController);

router.delete("/:id", deleteSongValidation, validateRequest, deleteSongController);

module.exports = router;