const { body } = require("express-validator");
const { mongoIdParamValidator } = require("./common.validators");

const createArtistValidation = [
    body("name").trim().notEmpty().withMessage("name is required"),
    body("genre")
        .isIn(["Pop", "Rock", "HipHop", "Jazz", "Electronic"])
        .withMessage("genre is invalid"),
    body("followers")
        .optional()
        .isInt({ min: 0 })
        .withMessage("followers must be a non-negative integer"),
    body("socialLinks")
        .optional()
        .isObject()
        .withMessage("socialLinks must be an object"),
    body("socialLinks.twitter")
        .optional()
        .isURL()
        .withMessage("twitter must be a valid URL"),
    body("socialLinks.instagram")
        .optional()
        .isURL()
        .withMessage("instagram must be a valid URL"),
];

const updateArtistValidation = [
    mongoIdParamValidator("id"),
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("name cannot be empty"),
    body("genre")
        .optional()
        .isIn(["Pop", "Rock", "HipHop", "Jazz", "Electronic"])
        .withMessage("genre is invalid"),
    body("followers")
        .optional()
        .isInt({ min: 0 })
        .withMessage("followers must be a non-negative integer"),
    body("socialLinks")
        .optional()
        .isObject()
        .withMessage("socialLinks must be an object"),
    body("socialLinks.twitter")
        .optional()
        .isURL()
        .withMessage("twitter must be a valid URL"),
    body("socialLinks.instagram")
        .optional()
        .isURL()
        .withMessage("instagram must be a valid URL"),
];

const deleteArtistValidation = [mongoIdParamValidator("id")];

module.exports = {
    createArtistValidation,
    updateArtistValidation,
    deleteArtistValidation,
};
