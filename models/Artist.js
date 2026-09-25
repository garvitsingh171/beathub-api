const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        genre: {
            type: String,
            required: true,
            enum: ["Pop", "Rock", "HipHop", "Jazz", "Electronic"],
        },
        followers: {
            type: Number,
            default: 0,
            min: 0,
            validate: Number.isInteger,
        },
        socialLinks: {
            twitter: String,
            instagram: String,
        },
    },
    { timestamps: true },
);

artistSchema.index({ name: 1 });

module.exports = mongoose.model("Artist", artistSchema);
