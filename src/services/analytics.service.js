const Playlist = require("../../models/Playlist");

const getTopUsersByPlaylistCount = async () => {
    return await Playlist.aggregate([
        {
            $match: {
                user: { $exists: true, $ne: null },
            },
        },
        {
            $group: {
                _id: "$user",
                playlistCount: { $sum: 1 },
            },
        },
        {
            $sort: { playlistCount: -1 },
        },
        {
            $limit: 5,
        },
        {
            $project: {
                _id: 0,
                userId: { $toString: "$_id" },
                playlistCount: 1,
            },
        },
    ]);
};

module.exports = {
    getTopUsersByPlaylistCount,
};