const bcrypt = require("bcryptjs");
const { connectToDB, mongoose } = require("../db/db");

const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Song = require("../models/Song");
const User = require("../models/User");
const Playlist = require("../models/Playlist");

const GENRES = ["Pop", "Rock", "HipHop", "Jazz", "Electronic"];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMany(arr, count) {
  const copy = [...arr];
  const result = [];
  const limit = Math.min(count, copy.length);

  for (let i = 0; i < limit; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy[idx]);
    copy.splice(idx, 1);
  }

  return result;
}

async function seed() {
  await connectToDB();

  console.log("Clearing old data...");
  await Promise.all([
    Playlist.deleteMany({}),
    User.deleteMany({}),
    Song.deleteMany({}),
    Album.deleteMany({}),
    Artist.deleteMany({})
  ]);

  console.log("Seeding 500 artists...");
  const artistDocs = Array.from({ length: 500 }, (_, i) => ({
    name: `Artist_${i + 1}`,
    genre: GENRES[i % GENRES.length],
    followers: Math.floor(Math.random() * 1_000_000),
    socialLinks: {
      twitter: `https://twitter.com/artist_${i + 1}`,
      instagram: `https://instagram.com/artist_${i + 1}`
    }
  }));
  const artists = await Artist.insertMany(artistDocs);

  console.log("Seeding 500 albums...");
  const albumDocs = Array.from({ length: 500 }, (_, i) => ({
    title: `Album_${i + 1}`,
    releaseDate: new Date(
      2010 + (i % 15),
      Math.floor(Math.random() * 12),
      1 + Math.floor(Math.random() * 28)
    ),
    artist: pickRandom(artists)._id
  }));
  const albums = await Album.insertMany(albumDocs);

  console.log("Seeding 500 songs...");
  const songDocs = Array.from({ length: 500 }, (_, i) => ({
    title: `Song_${i + 1}`,
    duration: 120 + Math.floor(Math.random() * 240),
    artist: pickRandom(artists)._id,
    album: pickRandom(albums)._id
  }));
  const songs = await Song.insertMany(songDocs);

  console.log("Seeding 500 users...");
  const hashedPassword = await bcrypt.hash("Password@123", 10);
  const demoUsers = await User.insertMany([
    {
      username: "admin",
      email: "admin@beathub.com",
      password: await bcrypt.hash("Admin@123", 10),
      role: "admin",
      likedSongs: []
    },
    {
      username: "user",
      email: "user@beathub.com",
      password: await bcrypt.hash("User@123", 10),
      role: "user",
      likedSongs: []
    }
  ]);
  const userDocs = Array.from({ length: 500 }, (_, i) => ({
    username: `user_${i + 1}`,
    email: `user_${i + 1}@example.com`,
    password: hashedPassword,
    role: "user",
    likedSongs: pickMany(songs, 5).map((s) => s._id)
  }));
  const regularUsers = await User.insertMany(userDocs);
  const users = [...demoUsers, ...regularUsers];

  console.log("Seeding 500 playlists...");
  const playlistDocs = Array.from({ length: 500 }, (_, i) => ({
    name: `Playlist_${i + 1}`,
    user: users[i]._id,
    songs: pickMany(songs, 10).map((s) => s._id)
  }));
  await Playlist.insertMany(playlistDocs);

  const counts = await Promise.all([
    Artist.countDocuments(),
    Album.countDocuments(),
    Song.countDocuments(),
    User.countDocuments(),
    Playlist.countDocuments()
  ]);

  console.log("Done.");
  console.log({
    artists: counts[0],
    albums: counts[1],
    songs: counts[2],
    users: counts[3],
    playlists: counts[4]
  });

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch(async (err) => {
  console.error("Seeding failed:", err);
  await mongoose.connection.close();
  process.exit(1);
});
