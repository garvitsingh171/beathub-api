const express = require("express");
const validateRequest = require("../middlewares/validate.middleware");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");

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

router.post("/register", authenticateToken, requireRole("admin"), createPlaylistValidation, validateRequest, createPlaylistController);

router.get("/", getAllPlaylistController);

router.patch("/:id", authenticateToken, requireRole("admin"), updatePlaylistValidation, validateRequest, updatePlaylistController);

router.delete("/:id", authenticateToken, requireRole("admin"), deletePlaylistValidation, validateRequest, deletePlaylistController);

module.exports = router;
