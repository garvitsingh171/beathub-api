const mongoose = require("mongoose");
const Song = require("../../models/Song");
const Artist = require("../../models/Artist");
const Album = require("../../models/Album");
const AppError = require("../utils/appError");
const { encodeCursor, decodeCursor } = require("../utils/cursor");

const clean = (data) =>
    Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
    );

const assertReferences = async ({ artist, album }) => {
    if (!(await Artist.exists({ _id: artist })))
        throw new AppError("Artist not found", 404);
    if (album) {
        const albumRecord = await Album.findById(album).select("artist").lean();
        if (!albumRecord) throw new AppError("Album not found", 404);
        if (albumRecord.artist.toString() !== artist.toString()) {
            throw new AppError("Song artist must match the album artist", 409);
        }
    }
};

const createSong = async (songData) => {
    const data = clean(songData);
    await assertReferences(data);
    return Song.create(data);
};

const getAllSong = () => Song.find().lean();

const getSongsCursor = async (encodedCursor, rawLimit) => {
    const limit = Number(rawLimit || 10);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
        throw new AppError("limit must be an integer between 1 and 100", 400);
    }
    const query = {};
    if (encodedCursor) {
        let decoded;
        try {
            decoded = decodeCursor(encodedCursor);
        } catch {
            throw new AppError("Invalid cursor encoding", 400);
        }
        if (!mongoose.Types.ObjectId.isValid(decoded))
            throw new AppError("Invalid cursor value", 400);
        query._id = { $lt: new mongoose.Types.ObjectId(decoded) };
    }
    const songs = await Song.find(query)
        .sort({ _id: -1 })
        .limit(limit + 1)
        .lean();
    const hasMore = songs.length > limit;
    if (hasMore) songs.pop();
    return {
        songs,
        pagination: {
            nextCursor: hasMore
                ? encodeCursor(songs[songs.length - 1]._id)
                : null,
            hasMore,
            limit,
            count: songs.length,
        },
    };
};

const updateSong = async (id, updates) => {
    const current = await Song.findById(id).lean();
    if (!current) return null;
    const data = clean(updates);
    await assertReferences({
        artist: data.artist || current.artist,
        album: data.album || current.album,
    });
    return Song.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteSong = (id) => Song.findByIdAndDelete(id);

module.exports = {
    createSong,
    getAllSong,
    getSongsCursor,
    updateSong,
    deleteSong,
};
