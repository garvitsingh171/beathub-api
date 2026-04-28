const express = require('express');
const validateRequest = require("../middlewares/validate.middleware");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

const { createArtistController, getAllArtistController, updateArtistController, deleteArtistController } = require('../controllers/artist.controller')
const {
	createArtistValidation,
	updateArtistValidation,
	deleteArtistValidation,
} = require("../validators/artist.validator");

router.post('/register', authenticateToken, requireRole("admin"), createArtistValidation, validateRequest, createArtistController);

router.get('/', getAllArtistController);

router.patch('/:id', authenticateToken, requireRole("admin"), updateArtistValidation, validateRequest, updateArtistController);

router.delete('/:id', authenticateToken, requireRole("admin"), deleteArtistValidation, validateRequest, deleteArtistController);

module.exports = router;