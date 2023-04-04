const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const userController = require("../controller/user");

router.put("/", authController.authorizeToken, userController.updateUser);

module.exports = router