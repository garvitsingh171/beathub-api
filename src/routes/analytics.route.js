const express = require("express");
const { getTopUsersController } = require("../controllers/analytics.controller");
const { authenticateToken, requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/top-users", authenticateToken, requireRole("admin"), getTopUsersController);

module.exports = router;