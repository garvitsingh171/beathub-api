const Album = require("../../models/Album");
const Artist = require("../../models/Artist");
const Song = require("../../models/Song");
const AppError = require("../utils/appError");

const clean = (data) =>
    Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
    );
const assertArtist = async (artist) => {
    if (!(await Artist.exists({ _id: artist })))
        throw new AppError("Artist not found", 404);
};
const createAlbum = async (albumData) => {
    await assertArtist(albumData.artist);
    return Album.create(clean(albumData));
};
const getAllAlbum = () => Album.find().lean();
const updateAlbum = async (id, updates) => {
    const data = clean(updates);
    if (data.artist) await assertArtist(data.artist);
    return Album.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};
const deleteAlbum = async (id) => {
    if (await Song.exists({ album: id }))
        throw new AppError("Album is referenced by existing songs", 409);
    return Album.findByIdAndDelete(id);
};

module.exports = { createAlbum, getAllAlbum, updateAlbum, deleteAlbum };
