const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, minlength: 1 },
        releaseDate: {
            type: Date,
            required: true,
        },
        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist",
            required: true,
        },
    },
    { timestamps: true },
);

albumSchema.index({ artist: 1 });

module.exports = mongoose.model("Album", albumSchema);
