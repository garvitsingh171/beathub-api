const express = require("express");
const {
    createUserController,
    getAllUsersController,
    updateUserController,
    deleteUserController,
} = require("../controllers/user.controller");

const router = express.Router();

const User = require("../../models/User");

router.post("/register", createUserController);

router.get("/", getAllUsersController);

router.patch("/:id", updateUserController);

router.delete("/:id", deleteUserController);

module.exports = router;
