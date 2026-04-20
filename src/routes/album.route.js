const express = require('express');
const validateRequest = require("../middlewares/validate.middleware");

const router = express.Router();

const { createAlbumController, getAllAlbumController, updateAlbumController, deleteAlbumController } = require('../controllers/album.controller');
const {
	createAlbumValidation,
	updateAlbumValidation,
	deleteAlbumValidation,
} = require("../validators/album.validator");

router.post('/register', createAlbumValidation, validateRequest, createAlbumController)

router.get('/', getAllAlbumController);

router.patch('/:id', updateAlbumValidation, validateRequest, updateAlbumController);

router.delete('/:id', deleteAlbumValidation, validateRequest, deleteAlbumController);

module.exports = router;
