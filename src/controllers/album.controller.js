const albumService = require("../services/album.service");
const mongoose = require("mongoose");

const createAlbumController = async (req, res) => {
    try {
        const { title, releaseDate } = req.body;

        if (!title || !releaseDate) {
            return res.json(400).json({
                message: "Title and Release Date are required",
            });
        }

        const newAlbum = await albumService.createAlbum({
            title,
            releaseDate,
        });

        res.status(201).json({
            message: "Album created successfully.",
            album: newAlbum,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating Album",
            error: error.message,
        });
    }
};

const getAllAlbumController = async (req, res) => {
    try {
        const albums = albumService.getAllAlbum();
        res.json(albums);
    } catch (error) {
        res.status(500).json({
            message: "Error getting Album",
        });
    }
};

const updateAlbumController = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Object Id not found",
            });
        }

        const updatedAlbum = await albumService.updateAlbum(id, updates);

        if (!updatedAlbum) {
            return res.status(400).json({ error: "Album Not Found" });
        }

        res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Album",
        });
    }
};

const deleteAlbumController = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Object Id is not Valid"
            })
        }

        const deletedAlbum = await albumService.deleteAlbum(id);

        if (!deletedAlbum) {
            return res.status(400).json({ error: "Album not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting album",
        });
    }
};

module.exports = {
    createAlbumController,
    getAllAlbumController,
    updateAlbumController,
    deleteAlbumController,
};
