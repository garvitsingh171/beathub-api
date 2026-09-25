const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const config = require("../config/env");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return next(new AppError("Authentication required", 401));
    }

    try {
        req.user = jwt.verify(token, config.jwtSecret);
        return next();
    } catch {
        return next(new AppError("Invalid or expired token", 401));
    }
};

const requireRole =
    (...allowedRoles) =>
    (req, res, next) => {
        if (!req.user) {
            return next(new AppError("Authentication required", 401));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError("Forbidden", 403));
        }

        return next();
    };

module.exports = {
    authenticateToken,
    requireRole,
};
