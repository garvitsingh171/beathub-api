const artistService = require('../services/artist.service');
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");

const createArtistController = asyncHandler(async (req, res) => {
    const { name, genre, followers, socialLinks } = req.body;

    const newArtist = await artistService.createArtist({
        name,
        genre,
        followers,
        socialLinks,
    });

    res.status(201).json({
        success: true,
        message: "Artist created successfully",
        artist: newArtist,
    });
});

const getAllArtistController = asyncHandler(async (req, res) => {
    const artists = await artistService.getAllArtist();
    res.status(200).json({
        success: true,
        data: artists,
    });
});

const updateArtistController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedArtist = await artistService.updateArtist(id, updates);

    if (!updatedArtist) {
        throw new AppError("Artist not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Artist updated successfully",
        artist: updatedArtist,
    });
});

const deleteArtistController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedArtist = await artistService.deleteArtist(id);

    if (!deletedArtist) {
        throw new AppError("Artist not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Artist deleted successfully",
    });
});

module.exports = { createArtistController, getAllArtistController, updateArtistController, deleteArtistController };