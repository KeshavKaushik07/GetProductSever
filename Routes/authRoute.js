const express = require("express");
const {registerController , loginController} = require("../Controller/authController");
const forgotPass = require("../Controller/forgotPass");

const router = express.Router();

router.post("/register", registerController);

router.post("/login",loginController);

router.post("/forgotPass",forgotPass);

module.exports = router;

