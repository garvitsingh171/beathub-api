const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const User = require("../../models/User");
const config = require("../config/env");

const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail }).select(
        "+password",
    );

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        config.jwtSecret,
        {
            expiresIn: config.jwtExpiresIn,
        },
    );

    res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: user.toSafeObject(),
    });
});

module.exports = {
    loginController,
};
