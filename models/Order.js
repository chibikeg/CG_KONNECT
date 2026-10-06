const mongoose = require("mongoose");
const { validate } = require("./User");

const orderItemSChema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    }, 

    image: {
        type: String,
        default: ""
    }, 

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    price: {
        type: Number,
        required: true,
        min: 0
    }, 

    subtotal: {
        type: Number,
        required: true,
        min: 0
    }
},{
    _id: false
});

const shippingAddressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        }, 

        phone: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        }, 

        city: {
            type: String,
            required: true
        }, 

        state: {
            type: String,
            required: true
        }, 

        country: {
            type: String,
            required: true,
            default: "Nigeria"
        }
    },

    {
        _id: false
    }
);

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    items: {
        type: [orderItemSchema],
        required: true,
        validate: {
            validator: (items) => items.length > 0,
            message: "Order must contain at least one item"
        }
    }
})