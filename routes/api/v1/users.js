const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/api/v1/users");

router.post("/", userController.create);

module.exports = router;
