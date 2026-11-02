const express = require("express");
const {getCart, addItem, updateQuantity, removeItem, clearCart} = require("../controllers/cartController");
const protect = require("../middlewares/auth");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/items", protect, addItem);
router.put("/items/:productId", protect, updateQuantity);
router.delete("/items/:productId", protect, removeItem);
router.delete("/", protect, clearCart);

module.exports = router;
