const { body } = require("express-validator");
const { mongoIdParamValidator } = require("./common.validators");

const createUserValidation = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("username is required")
        .isLength({ min: 3 })
        .withMessage("username must be at least 3 characters"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be valid"),
    body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters"),
];

const updateUserValidation = [
    mongoIdParamValidator("id"),
    body("username").optional().trim().isLength({ min: 3 }).withMessage("username must be at least 3 characters"),
    body("email").optional().trim().isEmail().withMessage("email must be valid"),
    body("password").optional().isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
];

const deleteUserValidation = [mongoIdParamValidator("id")];

module.exports = {
    createUserValidation,
    updateUserValidation,
    deleteUserValidation,
};
