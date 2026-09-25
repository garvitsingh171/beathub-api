const pino = require("pino");

module.exports = pino({
    redact: ["req.headers.authorization", "req.headers.cookie", "*.password"],
});
