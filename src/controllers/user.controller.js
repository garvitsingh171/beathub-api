const userService = require("../services/user.service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");

const createUserController = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const newUser = await userService.createUser({
        username,
        email: normalizedEmail,
        password,
    });

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser,
    });
});

const getAllUsersController = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json({
        success: true,
        data: users,
    });
});

const updateUserController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await userService.updateUser(id, updates);

    if (!updatedUser) {
        throw new AppError("User not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
    });
});

const deleteUserController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
        throw new AppError("User not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});

module.exports = {
    createUserController,
    getAllUsersController,
    updateUserController,
    deleteUserController,
};
