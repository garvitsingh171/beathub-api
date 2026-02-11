const userService = require("../services/user.service");
const mongoose = require("mongoose");

const createUserController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password are required.",
            });
        }

        const newUser = await userService.createUser({
            username,
            email,
            password,
        });

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message,
        });

        console.error("Error creating user:", error);
    }
};

const getAllUsersController = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserController = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid object Id" });
        }

        const updatedUser = await userService.updateUser(id, updates);

        if (!updatedUser) {
            res.status(404).json({ error: "User not found " });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteUserController = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid object id" });
        }

        const deletedUser = await userService.deleteUser(id);

        if (!deletedUser) {
            res.status(404).json({ error: "User not found" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createUserController,
    getAllUsersController,
    updateUserController,
    deleteUserController,
};
