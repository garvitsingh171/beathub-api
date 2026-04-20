const { body } = require("express-validator");
const { mongoIdParamValidator } = require("./common.validators");

const createArtistValidation = [
    body("name").trim().notEmpty().withMessage("name is required"),
    body("genre").trim().notEmpty().withMessage("genre is required"),
    body("followers").optional().isInt({ min: 0 }).withMessage("followers must be a non-negative integer"),
    body("socialLinks").optional().isObject().withMessage("socialLinks must be an object"),
];

const updateArtistValidation = [
    mongoIdParamValidator("id"),
    body("name").optional().trim().notEmpty().withMessage("name cannot be empty"),
    body("genre").optional().trim().notEmpty().withMessage("genre cannot be empty"),
    body("followers").optional().isInt({ min: 0 }).withMessage("followers must be a non-negative integer"),
    body("socialLinks").optional().isObject().withMessage("socialLinks must be an object"),
];

const deleteArtistValidation = [mongoIdParamValidator("id")];

module.exports = {
    createArtistValidation,
    updateArtistValidation,
    deleteArtistValidation,
};
