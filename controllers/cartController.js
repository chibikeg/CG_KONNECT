const asyncHandler = require("../helpers/asyncHandler");
const cartServvice = require("../services/cartServvice");

const getCart = asyncHandler(async (req, res) => {
    const cart = await cartServvice.getCart(req.user._id);
    return res.status(200).json({ success: true, data: {cart}});
})

const addItem = asyncHandler(async (req, res) => {
    const cart = await cartServvice.addItem(req.user._id, req.body.productId, req.body.quantity);

     if (!cart) {
        return res.status(404).json({ success: false, message: "Product not found or stock is insufficient"})
    }

    return res.status(200).json({ success: true, data: {cart}});
})

const updateQuantity = asyncHandler(async (req, res) => {
    const cart = await cartServvice.updateQuantity(req.user._id, req.body.productId, req.body.quantity);

     if (!cart) {
        return res.status(404).json({ success: false, message: "Cart Item not found or stock is insufficient"})
    }

    return res.status(200).json({ success: true, data: {cart}});
})

const removeItem = asyncHandler(async (req, res) => {
    const cart = await cartServvice.removeItem(req.user._id, req.body.productId);

    return res.status(200).json({ success: true, data: {cart}});
})

const clearCart = asyncHandler(async (req, res) => {
    const cart = await cartServvice.clearCart(req.user._id);

    return res.status(200).json({ success: true, data: {cart}});
})

module.exports = { getCart, addItem, updateQuantity, removeItem, clearCart}