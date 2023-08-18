const express = require("express");
const router = express.Router();
const controller = require("../Controller/UserController");
const TokenVerify = require("../middleware/TokenVerify");

router.post("/signup", controller.CreateUser);

router.post("/login", controller.login);

router.get("/loginuser", TokenVerify, controller.loginuser);

module.exports = router;
