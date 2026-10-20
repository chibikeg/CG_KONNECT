const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate(
        "items.product",
        "name price images stock status seller"
    );

    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }

    return cart;
};

const addItem = async (userId, productId, quantity = 1) => {
    const product = await Product.findOne({
        _id: productId,
        status: "active",
        stock: { $gte: quantity }
    });

    if (!product) return null;

    const cart = await Cart.findOneAndUpdate(
        { user: userId, "items.product": productId },
        { $inc: { "items.$.quantity": quantity } },
        { new: true }
    );

    if (cart) {
        const item = cart.items.find(
            (entry) => entry.product.toString() === productId.toString()
        );

        if (item.quantity > product.stock) {
            item.quantity = product.stock;
            await cart.save();
        }

        return cart.populate("items.product", "name price images stock status seller");
    }

    return Cart.findOneAndUpdate(
        { user: userId },
        {
            $setOnInsert: { user: userId },
            $push: { items: { product: productId, quantity } }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    ).populate("items.product", "name price images stock status seller");
};

const updateQuantity = async (userId, productId, quantity) => {
    const product = await Product.findOne({
        _id: productId,
        status: "active",
        stock: { $gte: quantity }
    });

    if (!product) return null;

    return Cart.findOneAndUpdate(
        { user: userId, "items.product": productId },
        { $set: { "items.$.quantity": quantity } },
        { new: true, runValidators: true }
    ).populate("items.product", "name price images stock status seller");
};

const removeItem = async (userId, productId) => (
    Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { items: { product: productId } } },
        { new: true }
    ).populate("items.product", "name price images stock status seller")
);

const clear = async (userId) => (
    Cart.findOneAndUpdate(
        { user: userId },
        { $set: { items: [] } },
        { new: true }
    )
);

module.exports = { getCart, addItem, updateQuantity, removeItem, clear };