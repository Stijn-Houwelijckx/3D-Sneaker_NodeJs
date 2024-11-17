const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/api/v1/users");
const authController = require("../../../controllers/auth");

router.get("/", userController.index);

router.post("/signup", authController.signup);
// router.post("/login", authController.login);

module.exports = router;
