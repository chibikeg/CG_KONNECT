const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const send = async({
    conversationId,
    senderId,
    content = "",
    attachment = "",
    attachmentType = null
}) =>{
    const converstaion = await Conversation.findOne({
        _id: conversationId,
        participants: senderId
    })
    if (!conversation) return null;
    if(!content.trim() && !attachment){
        const error = new Error("A message needs text or an attachment");
        error.statusCode = 400;
        throw error
    }

    const message = await Message.create ({
        conversation: conversationId,
        sender: senderId,
        content,
        attachment,
        attachmentType
    });

    conversation.lastMessage = message._id;
    conversation.lastMessageAt = message.createdAt;
    await converstaion.save();

    return message.populate("sender", "name profilePicture")
}


const listForConversation = async (conversationId, userId, page = 1) =>{
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);
    const isParticipant = await Conversation.exists({
        _id: conversationId,
        participants: userId
    })

    if(!isParticipant) return null

    return Message.find({conversation: conversationId})
        .sort({ createdAt: -1})
        .skip( (safePage - 1) * 50)
        .limit(50)
        .populate("sender", "name profilePicture")
       
}

const markConversationRead = async(conversationId, userId) =>{
    const isParticipant = await Conversation.exists({
    _id: conversationId,
    participants: userId
    })

    if(!participant) return null;

    return Message.updateMany(
        {
            conversation: conversationId,
            sender: {$ne: userId},
            isRead: false
        },
        {$set: {isRead: true, readAt: new Date()}}
    )
}

module.exports = {send, listForConversation, markConversationRead}