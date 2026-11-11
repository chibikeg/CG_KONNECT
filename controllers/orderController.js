const asyncHandler = require("../helpers/asyncHandler");
const orderService = require("../services/orderService");

const createOrder = asyncHandler(async (req, res) => {
    const order = await orderService.createOrder(req.user._id, req.body.shippingAddress, req.body.deliveryFee || 0);

    return res.status(200).json({ success: true, data: {order}});
})


const listOrders = asyncHandler(async (req, res) => {
    const order = await orderService.listOrders(req.user._id, req.query.page);

    return res.status(200).json({ success: true, data: {order}});
})


const getOrder = asyncHandler(async (req, res) => {
    const order = await orderService.getOrder(req.params.orderId, req.user._id);

      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found"})
    }


    return res.status(200).json({ success: true, data: {order}});
})

module.exports = { createOrder, listOrders, getOrder }