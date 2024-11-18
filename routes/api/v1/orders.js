const express = require("express");
const router = express.Router();
const orderController = require("../../../controllers/api/v1/orders");

router.post("/", orderController.create);

module.exports = router;
