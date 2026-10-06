const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Post is required"],
        index: true
    }, 

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Comment Author is required"],
        index: true
    },

    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true,
        maxlength: [1000, "Content must be at most 1000 characters long"]
    }, 

    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Comment", commentSchema);