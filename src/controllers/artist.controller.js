const artistService = require('../services/artist.service');
const mongoose = require('mongoose');

const createArtistController = async (req, res) => {
    try {
        const { name, genre, followers, socialLinks } = req.body;

        if (!name || !genre || !followers || !socialLinks ) {
            return res.json(400).json({
                message: "Artist name, genre, followers are required"
            })
        }

        const newArtist = await artistService.createArtist({
            name,
            genre,
            followers,
            socialLinks
        })

        res.status(201).json({
            message: "Artist Created Successfully",
            artist: newArtist
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating Artist",
            error: error.message
        })

        console.error("Error creating Artist:", error);
    }
}

const getAllArtistController = async (req, res) => {
    try {
        const artists = await artistService.getAllArtist();
        res.json(artists);
    } catch (error) {
        res.status(500).json({
            message: "Error getting Artists",
            error: error.message
        })
    }
}

const updateArtistController = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid Object Id"
            })
        }

        const updatedArtist = await artistService.updateArtist(id, updates)

        if (!updatedArtist) {
            return res.status(400).json({ error: "Artist not found" })
        }

        res.status(200).json({ message: "Artist updated successfully" })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteArtistController = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid Object Id"
            })
        }

        const deletedArtist = await artistService.deleteArtist(id)

        if (!deletedArtist) {
            return res.status(400).json({ error: error.message })
        }

        res.status(200).json({ message: error.message })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = { createArtistController, getAllArtistController, updateArtistController, deleteArtistController };