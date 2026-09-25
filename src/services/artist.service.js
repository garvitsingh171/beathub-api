const Artist = require("../../models/Artist");
const Album = require("../../models/Album");
const Song = require("../../models/Song");
const AppError = require("../utils/appError");

const clean = (data) =>
    Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
    );
const createArtist = (artistData) => Artist.create(clean(artistData));
const getAllArtist = () => Artist.find().lean();
const updateArtist = (id, updates) =>
    Artist.findByIdAndUpdate(id, clean(updates), {
        runValidators: true,
        new: true,
    });

const deleteArtist = async (id) => {
    const [albumCount, songCount] = await Promise.all([
        Album.countDocuments({ artist: id }),
        Song.countDocuments({ artist: id }),
    ]);
    if (albumCount || songCount)
        throw new AppError(
            "Artist is referenced by existing albums or songs",
            409,
        );
    return Artist.findByIdAndDelete(id);
};

module.exports = { createArtist, getAllArtist, updateArtist, deleteArtist };
