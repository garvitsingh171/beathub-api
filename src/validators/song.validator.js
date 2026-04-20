const { body } = require("express-validator");
const { mongoIdParamValidator } = require("./common.validators");

const createSongValidation = [
    body("title").trim().notEmpty().withMessage("title is required"),
    body("duration").isNumeric().withMessage("duration must be a number"),
    body("artist").isMongoId().withMessage("artist must be a valid ObjectId"),
    body("album").optional().isMongoId().withMessage("album must be a valid ObjectId"),
];

const updateSongValidation = [
    mongoIdParamValidator("id"),
    body("title").optional().trim().notEmpty().withMessage("title cannot be empty"),
    body("duration").optional().isNumeric().withMessage("duration must be a number"),
    body("artist").optional().isMongoId().withMessage("artist must be a valid ObjectId"),
    body("album").optional().isMongoId().withMessage("album must be a valid ObjectId"),
];

const deleteSongValidation = [mongoIdParamValidator("id")];

module.exports = {
    createSongValidation,
    updateSongValidation,
    deleteSongValidation,
};
