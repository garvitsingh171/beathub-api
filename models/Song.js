const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, minlength: 1 },
        duration: { type: Number, required: true, min: 0.01 },
        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist",
            required: true,
        },
        album: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album",
        },
    },
    { timestamps: true },
);

songSchema.index({ artist: 1 });
songSchema.index({ album: 1 });

module.exports = mongoose.model("Song", songSchema);
