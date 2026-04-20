const { body } = require("express-validator");
const { mongoIdParamValidator } = require("./common.validators");

const createPlaylistValidation = [
    body("name").trim().notEmpty().withMessage("name is required"),
    body("user").isMongoId().withMessage("user must be a valid ObjectId"),
    body("songs").optional().isArray().withMessage("songs must be an array"),
    body("songs.*").optional().isMongoId().withMessage("each song id must be a valid ObjectId"),
];

const updatePlaylistValidation = [
    mongoIdParamValidator("id"),
    body("name").optional().trim().notEmpty().withMessage("name cannot be empty"),
    body("user").optional().isMongoId().withMessage("user must be a valid ObjectId"),
    body("songs").optional().isArray().withMessage("songs must be an array"),
    body("songs.*").optional().isMongoId().withMessage("each song id must be a valid ObjectId"),
];

const deletePlaylistValidation = [mongoIdParamValidator("id")];

module.exports = {
    createPlaylistValidation,
    updatePlaylistValidation,
    deletePlaylistValidation,
};
