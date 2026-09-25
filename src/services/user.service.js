const User = require("../../models/User");
const Playlist = require("../../models/Playlist");

const clean = (data) =>
    Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
    );

const createUser = async (userData) => {
    const newUser = await User.create(userData);
    return newUser;
};

const getAllUsers = async () => {
    return await User.find();
};

// const updateUser = async (id, updates) => {
//     return await User.findByIdAndUpdate(id, updates, {
//         new: true,
//         runValidators: true,
//     });
// };

const updateUser = async (id, updates) => {
    const user = await User.findById(id).select("+password");
    if (!user) return null;

    Object.assign(user, clean(updates));
    await user.save();
    return user;
};

const deleteUser = async (id) => {
    if (await Playlist.exists({ user: id })) {
        const AppError = require("../utils/appError");
        throw new AppError("User is referenced by existing playlists", 409);
    }
    return await User.findByIdAndDelete(id);
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser };
