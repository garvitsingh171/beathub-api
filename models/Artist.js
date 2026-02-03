import mongoose from "mongoose";

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
    },
    socialLinks: {
      twitter: String,
      instagram: String,
    },
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true },
);

export default mongoose.model("Artist", artistSchema);
