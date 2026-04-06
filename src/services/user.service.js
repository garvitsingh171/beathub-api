const User = require("../../models/User");

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

    Object.assign(user, updates);
    await user.save();
    return user;
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser };
