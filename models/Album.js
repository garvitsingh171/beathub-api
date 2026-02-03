import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    artist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }]
})

export default mongoose.model("Album", albumSchema)