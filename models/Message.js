const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: [true, "Conversation is required"],
        index: true
    }, 

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Sender is required"],
        index: true
    },

    content: {
        type: String,
        trim: true,
        maxlength: [5000, "Message cannot exceed 5000 characters"],
        default: ""
    },

    attachment: {
        type: String,
        default: ""
    }, 

    attachmentType: {
        type: String,
        enum: ["image", "video", "file", null],
        default: null
    }, 

    isRead: {
        type: Boolean,
        default: false
    }, 

    readAt: {
        type: Date,
        default: null
    }
}, 
{
    timestamps: true
}
);

messageSchema.index({
    conversation: 1,
    createdAt: -1
})

module.exports = mongoose.model("Message", messageSchema);