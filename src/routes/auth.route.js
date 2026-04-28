const express = require("express");
const validateRequest = require("../middlewares/validate.middleware");
const { loginController } = require("../controllers/auth.controller");
const { loginValidation } = require("../validators/auth.validator");

const router = express.Router();

router.post("/login", loginValidation, validateRequest, loginController);

module.exports = router;