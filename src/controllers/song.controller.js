const songService = require("../services/song.service");
const mongoose = require("mongoose");
const Song = require("../../models/Song");
const { encodeCursor, decodeCursor } = require("../utils/cursor");
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
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
    const encodedCursor = req.query.cursor;

    let query = {};

    if (encodedCursor) {
        let decoded;
        try {
            decoded = decodeCursor(encodedCursor);
        } catch (error) {
            throw new AppError("Invalid cursor encoding", 400);
        }

        if (!mongoose.Types.ObjectId.isValid(decoded)) {
            throw new AppError("Invalid cursor value", 400);
        }

        query = { _id: { $lt: new mongoose.Types.ObjectId(decoded) } };
    }

    const songs = await Song.find(query)
        .sort({ _id: -1 })
        .limit(limit + 1)
        .lean();

    const hasMore = songs.length > limit;

    if (hasMore) {
        songs.pop();
    }

    const nextCursor =
        hasMore && songs.length > 0
            ? encodeCursor(songs[songs.length - 1]._id)
            : null;

    return res.status(200).json({
        success: true,
        data: songs,
        pagination: {
            nextCursor,
            hasMore,
            limit,
            count: songs.length,
        },
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