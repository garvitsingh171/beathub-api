const express = require('express');
const validateRequest = require("../middlewares/validate.middleware");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

const { createAlbumController, getAllAlbumController, updateAlbumController, deleteAlbumController } = require('../controllers/album.controller');
const {
	createAlbumValidation,
	updateAlbumValidation,
	deleteAlbumValidation,
} = require("../validators/album.validator");

router.post('/register', authenticateToken, requireRole("admin"), createAlbumValidation, validateRequest, createAlbumController)

router.get('/', getAllAlbumController);

router.patch('/:id', authenticateToken, requireRole("admin"), updateAlbumValidation, validateRequest, updateAlbumController);

router.delete('/:id', authenticateToken, requireRole("admin"), deleteAlbumValidation, validateRequest, deleteAlbumController);

module.exports = router;
