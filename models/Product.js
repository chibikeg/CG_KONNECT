const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Seller is required"],
        index: true
    }, 

    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true, 
        maxlength: [200, "Product name cannot exceed 200 characters"]
    },

    description: {
        type: String,
        required: [true, "Product descritpion is required"],
        trim: true, 
        maxlength: [5000, "Product descritpion cannot exceed 5000 characters"]
    }, 

    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price cannot be negative"]
    }, 

    images: [
        {
            type: String
        }
    ], 

    category: {
        type: String,
        required: [true, "Product category is required"],
        trim: true,
        index: true
    },

    stock: {
        type: Number,
        required: [true, "Stock is required"],
        min: [0, "Stock cannot be negative"],
        default: 0
    },

    status: {
        type: String,
        enum: ["draft", "active", "out_of_stock", "inactive"],
        default: "active",
        index: true
    }
}, {
    timestamps: true
})

productSchema.index({
    name: "text",
    description: "text"
});

module.exports = mongoose.model("Product", productSchema);