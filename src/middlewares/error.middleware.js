const AppError = require("../utils/appError");

const notFoundHandler = (req, res, next) => {
    next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid resource id.",
        });
    }

    if (err.code === 11000) {
        const duplicateField = Object.keys(err.keyPattern || {})[0] || "field";
        return res.status(400).json({
            success: false,
            message: `${duplicateField} already exists.`,
        });
    }

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = {
    notFoundHandler,
    globalErrorHandler,
};
