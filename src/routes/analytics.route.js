const express = require("express");
const { getTopUsersController } = require("../controllers/analytics.controller");

const router = express.Router();

router.get("/top-users", getTopUsersController);

module.exports = router;