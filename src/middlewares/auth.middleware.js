const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const getJwtSecret = () => process.env.JWT_SECRET || "beathub-dev-secret";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return next(new AppError("Authentication required", 401));
    }

    try {
        req.user = jwt.verify(token, getJwtSecret());
        return next();
    } catch (error) {
        return next(new AppError("Invalid or expired token", 401));
    }
};

const requireRole = (...allowedRoles) => (req, res, next) => {
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