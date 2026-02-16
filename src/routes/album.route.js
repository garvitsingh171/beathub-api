const express = require('express');

const router = express.Router();

const { createAlbumController, getAllAlbumController, updateAlbumController, deleteAlbumController } = require('../controllers/album.controller');

router.post('/register', createAlbumController)

router.get('/', getAllAlbumController);

router.patch('/', updateAlbumController);

router.delete('/', deleteAlbumController);

module.exports = router;
