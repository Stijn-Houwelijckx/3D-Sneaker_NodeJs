const express = require("express");
const router = express.Router();
const messageController = require("../../../controllers/api/v1/messages");

router.post("/", messageController.create);
router.get("/", messageController.index);
router.get("/:id", messageController.show);

module.exports = router;
