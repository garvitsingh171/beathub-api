const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, minlength: 1 },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        songs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            },
        ],
    },
    { timestamps: true },
);

playlistSchema.index({ user: 1 });

module.exports = mongoose.model("Playlist", playlistSchema);
