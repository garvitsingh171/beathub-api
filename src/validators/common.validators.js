const { param } = require("express-validator");

const mongoIdParamValidator = (key = "id") =>
    param(key).isMongoId().withMessage(`${key} must be a valid MongoDB ObjectId`);

module.exports = {
    mongoIdParamValidator,
};
