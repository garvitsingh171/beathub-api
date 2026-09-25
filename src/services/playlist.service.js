const Playlist = require("../../models/Playlist");
const User = require("../../models/User");
const Song = require("../../models/Song");
const AppError = require("../utils/appError");

const clean = (data) =>
    Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
    );
const assertReferences = async ({ user, songs }) => {
    if (!(await User.exists({ _id: user })))
        throw new AppError("User not found", 404);
    if (
        songs &&
        (await Song.countDocuments({ _id: { $in: songs } })) !== songs.length
    ) {
        throw new AppError("One or more songs were not found", 404);
    }
};
const createPlaylist = async (playlistData) => {
    await assertReferences(playlistData);
    return Playlist.create(clean(playlistData));
};
const getAllPlaylist = () => Playlist.find().lean();
const updatePlaylist = async (id, updates) => {
    const current = await Playlist.findById(id).lean();
    if (!current) return null;
    const data = clean(updates);
    await assertReferences({
        user: data.user || current.user,
        songs: data.songs || current.songs,
    });
    return Playlist.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};
const deletePlaylist = (id) => Playlist.findByIdAndDelete(id);

module.exports = {
    createPlaylist,
    getAllPlaylist,
    updatePlaylist,
    deletePlaylist,
};
