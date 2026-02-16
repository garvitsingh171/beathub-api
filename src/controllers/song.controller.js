const songService = require("../services/song.service");
const mongoose = require("mongoose");

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
            res.status(404).json({
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
            res.status(404).json({
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
    updateSongController,
    getAllSongsController,
    deleteSongController,
};
