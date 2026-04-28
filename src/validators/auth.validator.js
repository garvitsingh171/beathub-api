const { body } = require("express-validator");

const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be valid"),
    body("password")
        .notEmpty()
        .withMessage("password is required"),
];

module.exports = {
    loginValidation,
};