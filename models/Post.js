const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"],
        index: true
    },

    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true,
        maxlength: [5000, "Content must be at most 5000 characters long"]
    },

    images: [
        {
            type: String
        }
    ],

    video: {
        type: String,
        default: "",
    },

    visibility: {
        type: String,
        enum: ["public", "private", "friends"],
        default: "public"
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema);