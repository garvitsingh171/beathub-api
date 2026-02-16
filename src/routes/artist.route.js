const express = require('express');

const router = express.Router();

const { createArtistController, getAllArtistController, updateArtistController, deleteArtistController } = require('../controllers/artist.controller')

router.post('/register', createArtistController);

router.get('/', getAllArtistController);

router.patch('/:id', updateArtistController);

router.delete('/:id', deleteArtistController);

module.exports = router;