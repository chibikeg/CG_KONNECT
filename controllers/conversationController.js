const asyncHandler = require("../helpers/asyncHandler");
const conversationService = require("../services/conversationService");

const getOrCreateDirect = asyncHandler(async (req, res) => {
    const conversation = await conversationService.getOrCreateDirect(req.User._id, req.body.userId);

    if (!convseration) {
        return res.status(404).json({ success: false, message: "User not found"})
    }

    return res.status(200).json({ success: true, data: {conversation}});
})

const listConversation = asyncHandler(async (req, res) => {
    const conversation = await conversationService.listForUser(req.User._id, req.query.page);

    return res.status(200).json({ success: true, data: {conversation}});
})

module.exports = {getOrCreateDirect, listConversation}