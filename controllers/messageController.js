const asyncHandler = require("../helpers/asyncHandler");
const messageService = require("../services/messageService");

const sendMessage = asyncHandler(async (req, res) => {
    
    const message = await messageService.send({
    conversationId: req.params.conversationId,
    senderId: req.User._id,
    content: req.body.content || "",
    attachment: req.body.attachment || "",
    attachmentType: req.body.attachmentType || null
    });

    if (!message) {
        return res.status(404).json({ success: false, message: "Conversation not found"})
    }

    return res.status(201).json({ success: true, data: {message}});
})


const listMessages = asyncHandler(async (req, res) => {
    const message = await messageService.listForConversation(req.params.conversationId, req.User._id, req.query.page);

    if (!message) {
        return res.status(404).json({ success: false, message: "Conversation not found"})
    }

    return res.status(201).json({ success: true, data: {message}});
})


const markRead = asyncHandler(async (req, res) => {
    const result = await messageService.markConversationRead(req.params.conversationId, req.User._id);

    if (!result) {
        return res.status(404).json({ success: false, message: "Conversation not found"})
    }

    return res.status(201).json({ success: true, data: {updatedCount: result.modifiedCount}});
})

module.exports = {sendMessage, listMessages, markRead}