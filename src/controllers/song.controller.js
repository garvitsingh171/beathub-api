const songService = require("../services/song.service");
const mongoose = require("mongoose");
const Song = require("../../models/Song");
const { encodeCursor, decodeCursor } = require("../utils/cursor");

const createSongController = async (req, res) => {
    try {
        const { title, duration } = req.body;

        if (!title || !duration) {
            return res.status(400).json({
                message: "title and duration is required",
            });
        }

        const newSong = await songService.createSong({
            title,
            duration,
        });

        res.status(201).json({
            message: "Song created successfully",
            song: newSong,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating song",
            error: error.message,
        });
    }
};

const getSongsCursor = async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
        const encodedCursor = req.query.cursor;

        let query = {};

        if (encodedCursor) {
            let decoded;
            try {
                decoded = decodeCursor(encodedCursor);
            } catch (e) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid cursor encoding",
                });
            }

            if (!mongoose.Types.ObjectId.isValid(decoded)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid cursor value",
                });
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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const getAllSongsController = async (req, res) => {
    try {
        const songs = await songService.getAllSong();
        res.json(songs);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const updateSongController = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid Object Id",
            });
        }

        const updatedSong = await songService.updateSong(id, updates);

        if (!updatedSong) {
            return res.status(404).json({
                error: "Song not found",
            });
        }

        res.status(200).json(updatedSong);
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

const deleteSongController = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid Object Id",
            });
        }

        const deletedSong = await songService.deleteSong(id);

        if (!deletedSong) {
            return res.status(404).json({
                error: "Song Not Found",
            });
        }

        res.status(200).send();
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

module.exports = {
    createSongController,
    getSongsCursor,
    getAllSongsController,
    updateSongController,
    deleteSongController,
};