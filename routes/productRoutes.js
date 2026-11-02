const express = require("express");
const {createProduct,
    browseproduct,
    getProduct,
    updateProduct,
    deleteProduct } = require("../controllers/productController");
const protect = require("../middlewares/auth");

const router = express.Router();

router.get("/", protect, browseProducts);
router.post("/:productId", protect, getProduct);
router.post("/", protect, createProduct);
router.put("/:productId", protect, updateProduct);
router.delete("/:productId", protect, deleteProduct);

module.exports = router;
