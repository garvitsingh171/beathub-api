import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    artist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],
    album: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }]
})