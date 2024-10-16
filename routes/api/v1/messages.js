const express = require("express");
const router = express.Router();
const messageController = require("../../../controllers/api/v1/messages");

router.post("/", messageController.create);
router.get("/", messageController.index);
router.get("/:id", messageController.show);
router.put("/:id", messageController.update);
router.delete("/:id", messageController.destroy);

module.exports = router;
