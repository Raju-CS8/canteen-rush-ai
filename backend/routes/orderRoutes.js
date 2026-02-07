const express = require("express");
const router = express.Router();

const {
  placeOrder,
  markReady,
  getOrders,
  getSingle
} = require("../controllers/orderController");

router.post("/", placeOrder);
router.get("/", getOrders);
router.get("/:id", getSingle);
router.patch("/ready/:id", markReady);

module.exports = router;
