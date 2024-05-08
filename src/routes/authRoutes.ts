const express = require("express");
const { loginService, signupService } = require("../services/authServices");

const router = express.Router();

router.post("/login", loginService);
router.post("/signup", signupService);

module.exports = router;
