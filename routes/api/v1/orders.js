const express = require("express");
const router = express.Router();
const orderController = require("../../../controllers/api/v1/orders");
const passport = require("../../../passport/passport");

router.post("/", orderController.create);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  orderController.index
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  orderController.update
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  orderController.destroy
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  orderController.show
);

module.exports = router;
