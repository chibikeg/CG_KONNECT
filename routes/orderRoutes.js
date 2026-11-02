const express = require("express");
const {createOrder, listOrders, getOrder} = require("../controllers/orderController");
const protect = require("../middlewares/auth");

const router = express.Router();

router.get("/", protect, listOrders);
router.post("/", protect, createOrder);
router.get("/:orderId", protect, getOrder);


module.exports = router;
