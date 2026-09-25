const songService = require("../services/song.service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");

const createSongController = asyncHandler(async (req, res) => {
    const { title, duration, artist, album } = req.body;

    const newSong = await songService.createSong({
        title,
        duration,
        artist,
        album,
    });

    res.status(201).json({
        success: true,
        message: "Song created successfully",
        song: newSong,
    });
});

const getSongsCursor = asyncHandler(async (req, res) => {
    const result = await songService.getSongsCursor(
        req.query.cursor,
        req.query.limit,
    );

    return res.status(200).json({
        success: true,
        data: result.songs,
        pagination: result.pagination,
    });
});

const getAllSongsController = asyncHandler(async (req, res) => {
    const songs = await songService.getAllSong();
    res.status(200).json({
        success: true,
        data: songs,
    });
});

const updateSongController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedSong = await songService.updateSong(id, updates);

    if (!updatedSong) {
        throw new AppError("Song not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Song updated successfully",
        song: updatedSong,
    });
});

const deleteSongController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedSong = await songService.deleteSong(id);

    if (!deletedSong) {
        throw new AppError("Song not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Song deleted successfully",
    });
});

module.exports = {
    createSongController,
    getSongsCursor,
    getAllSongsController,
    updateSongController,
    deleteSongController,
};
