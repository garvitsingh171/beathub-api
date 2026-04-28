const express = require("express");
const validateRequest = require("../middlewares/validate.middleware");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");
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

router.post("/register", authenticateToken, requireRole("admin"), createSongValidation, validateRequest, createSongController);

router.get("/", getSongsCursor);

router.patch("/:id", authenticateToken, requireRole("admin"), updateSongValidation, validateRequest, updateSongController);

router.delete("/:id", authenticateToken, requireRole("admin"), deleteSongValidation, validateRequest, deleteSongController);

module.exports = router;