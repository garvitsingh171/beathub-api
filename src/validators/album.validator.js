const { body } = require("express-validator");
const { mongoIdParamValidator } = require("./common.validators");

const createAlbumValidation = [
    body("title").trim().notEmpty().withMessage("title is required"),
    body("releaseDate").isISO8601().withMessage("releaseDate must be a valid date"),
    body("artist").isMongoId().withMessage("artist must be a valid ObjectId"),
];

const updateAlbumValidation = [
    mongoIdParamValidator("id"),
    body("title").optional().trim().notEmpty().withMessage("title cannot be empty"),
    body("releaseDate").optional().isISO8601().withMessage("releaseDate must be a valid date"),
    body("artist").optional().isMongoId().withMessage("artist must be a valid ObjectId"),
];

const deleteAlbumValidation = [mongoIdParamValidator("id")];

module.exports = {
    createAlbumValidation,
    updateAlbumValidation,
    deleteAlbumValidation,
};
