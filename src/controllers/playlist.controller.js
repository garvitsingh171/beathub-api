const playlistService = require("../services/playlist.service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");

const createPlaylistController = asyncHandler(async (req, res) => {
    const { name, user, songs } = req.body;

    const newPlaylist = await playlistService.createPlaylist({
        name,
        user,
        songs,
    });

    res.status(201).json({
        success: true,
        message: "Playlist created successfully",
        playlist: newPlaylist,
    });
});

const getAllPlaylistController = asyncHandler(async (req, res) => {
    const playlists = await playlistService.getAllPlaylist();
    res.status(200).json({
        success: true,
        data: playlists,
    });
});

const updatePlaylistController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedPlaylist = await playlistService.updatePlaylist(id, updates);

    if (!updatedPlaylist) {
        throw new AppError("Playlist not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Playlist updated successfully",
        playlist: updatedPlaylist,
    });
});

const deletePlaylistController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedPlaylist = await playlistService.deletePlaylist(id);

    if (!deletedPlaylist) {
        throw new AppError("Playlist not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Playlist deleted successfully",
    });
});

module.exports = {
    createPlaylistController,
    getAllPlaylistController,
    updatePlaylistController,
    deletePlaylistController,
};
