import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Artist from '../models/Artist.js';
import Album from '../models/Album.js';
import Song from '../models/Song.js';
import User from '../models/User.js';
import Playlist from '../models/Playlist.js';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      Artist.deleteMany({}), Album.deleteMany({}), 
      Song.deleteMany({}), User.deleteMany({}), Playlist.deleteMany({})
    ]);

    const artist = await Artist.create({ name: 'Daft Punk', genre: 'Electronic' });
    
    const album = await Album.create({
      title: 'Discovery',
      releaseYear: 2001,
      artist: artist._id 
    });

    const song = await Song.create({
      title: 'One More Time',
      duration: 320,
      album: album._id,
      artist: artist._id
    });

    const user = await User.create({ username: 'music_fan_01', email: 'fan@example.com' });

    await Playlist.create({
      name: 'Gym Jams',
      user: user._id,
      songs: [song._id]
    });

    console.log(' Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error(' Seeding Failed:', error);
    process.exit(1);
  }
}

seed();