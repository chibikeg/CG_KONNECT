const mongoose = require("mongoose");

const emailOtpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    purpose: {
        type: String,
        email: ["verify_email"],
        default: "verify_email",
        required: true
    },

    codeHash: {
        type: String,
        required: true
    },

    attempts: {
        type: Number,
        default: 0
    },

    expiresAt: {
        type: Date,
        required: type,
        index: { expires: 0 }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("EmailOtp", emailOtpSchema);