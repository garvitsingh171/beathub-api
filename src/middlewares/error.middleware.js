const AppError = require("../utils/appError");
const config = require("../config/env");
const logger = require("../utils/logger");

const notFoundHandler = (req, res, next) => {
    next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const globalErrorHandler = (err, req, res, _next) => {
    const statusCode = err.statusCode || 500;

    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            error: { code: "VALIDATION_ERROR", message: err.message },
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            error: { code: "INVALID_ID", message: "Invalid resource id." },
        });
    }

    if (err.code === 11000) {
        const duplicateField = Object.keys(err.keyPattern || {})[0] || "field";
        return res.status(409).json({
            success: false,
            error: {
                code: "DUPLICATE_RESOURCE",
                message: `${duplicateField} already exists.`,
            },
        });
    }

    if (statusCode >= 500)
        logger.error(
            { err, path: req.originalUrl },
            "Unhandled application error",
        );
    const response = {
        success: false,
        error: {
            code:
                err.code ||
                (statusCode >= 500 ? "INTERNAL_ERROR" : "REQUEST_ERROR"),
            message:
                statusCode >= 500 && config.nodeEnv === "production"
                    ? "Internal Server Error"
                    : err.message || "Internal Server Error",
        },
    };
    if (config.nodeEnv !== "production" && statusCode >= 500)
        response.error.stack = err.stack;
    return res.status(statusCode).json(response);
};

module.exports = {
    notFoundHandler,
    globalErrorHandler,
};
