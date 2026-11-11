const Cart = require("../models/Cart");
const Order = require("../models/Order");

const createOrder = async (buyerId, shippingAddress, deliveryFee = 0) => {
    const cart = await Cart.findOne({ user: buyerId }).populate(
        "items.product",
        "name price images stock status seller"
    );

    if (!cart || cart.items.length === 0) {
        throw new Error("Cannot create an order from an empty cart");
    }

    const items = cart.items.map(({ product, quantity }) => {
        if (!product || product.status !== "active" || product.stock < quantity) {
            throw new Error("A cart product is unavailable or has insufficient stock");
        }

        const subtotal = product.price * quantity;
        return {
            product: product._id,
            seller: product.seller,
            name: product.name,
            image: product.images[0] || "",
            quantity,
            price: product.price,
            subtotal
        };
    });

    const subtotal = items.reduce((total, item) => total + item.subtotal, 0);
    const order = await Order.create({
        buyer: buyerId,
        items,
        shippingAddress,
        subtotal,
        deliveryFee,
        totalAmount: subtotal + deliveryFee
    });

    cart.items = [];
    await cart.save();

    return order;
};

const listOrders = async (buyerId, page = 1) => {
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);

    return Order.find({ buyer: buyerId })
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * 20)
        .limit(20);
};

const getOrder = async (orderId, buyerId) => (
    Order.findOne({ _id: orderId, buyer: buyerId })
);

module.exports = { createOrder, listOrders, getOrder };
