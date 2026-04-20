const albumService = require("../services/album.service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");

const createAlbumController = asyncHandler(async (req, res) => {
    const { title, releaseDate, artist } = req.body;

    const newAlbum = await albumService.createAlbum({
        title,
        releaseDate,
        artist,
    });

    res.status(201).json({
        success: true,
        message: "Album created successfully",
        album: newAlbum,
    });
});

const getAllAlbumController = asyncHandler(async (req, res) => {
    const albums = await albumService.getAllAlbum();
    res.status(200).json({
        success: true,
        data: albums,
    });
});

const updateAlbumController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedAlbum = await albumService.updateAlbum(id, updates);

    if (!updatedAlbum) {
        throw new AppError("Album not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Album updated successfully",
        album: updatedAlbum,
    });
});

const deleteAlbumController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedAlbum = await albumService.deleteAlbum(id);

    if (!deletedAlbum) {
        throw new AppError("Album not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Album deleted successfully",
    });
});

module.exports = {
    createAlbumController,
    getAllAlbumController,
    updateAlbumController,
    deleteAlbumController,
};
