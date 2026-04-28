const AppError = require("../utils/appError");

const windowMs = 60 * 1000;
const maxRequests = 10;
const buckets = new Map();

const apiRateLimiter = (req, res, next) => {
    const key = req.ip || req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };

    if (now > bucket.resetAt) {
        bucket.count = 0;
        bucket.resetAt = now + windowMs;
    }

    bucket.count += 1;
    buckets.set(key, bucket);

    if (bucket.count > maxRequests) {
        return next(new AppError("Too many requests. Please try again later.", 429));
    }

    return next();
};

setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
        if (bucket.resetAt <= now) {
            buckets.delete(key);
        }
    }
}, windowMs).unref();

module.exports = apiRateLimiter;