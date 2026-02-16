const playlistService = require("../services/playlist.service");
const mongoose = require("mongoose");

const createPlaylistController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Playlist name is required.",
            });
        }

        const newPlaylist = await playlistService.createPlaylist({
            name,
        });

        res.status(201).json({
            message: "Playlist created successfully",
            playlist: newPlaylist,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating User",
            error: error.message,
        });

        console.error("Error creating User:", error);
    }
};

const getAllPlaylistController = async (req, res) => {
    try {
        const playlists = await playlistService.getAllPlaylist();
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePlaylistController = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid object Id" });
        }

        const updatedPlaylist = await playlistService.updatePlaylist(
            id,
            updates,
        );

        if (!updatedPlaylist) {
            res.status(400).json({ error: "User not found" });
        }
        res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePlaylistController = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Object ID" });
        }

        const deletedUser = await playlistService.deletePlaylist(id);

        if (!deletedUser) {
            res.status(400).json({ error: "User not found" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPlaylistController,
    getAllPlaylistController,
    updatePlaylistController,
    deletePlaylistController,
};
