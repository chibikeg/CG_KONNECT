const Conversation = require("../models/Conversation");
const User = require("../models/User");

const getOrCreateDirect = async (firstUserId, secondUserId) => {
    if(firstUserId.toString() === secondUserId.toString()){
        const error = new Error("A converstaion requires two differnt users");
        error.statusCode = 400;
        throw error;
    }

    if (!(await User.exists({_id: secondUserId, isActive: true}))){
        return null
    }

    if(!conversation){
        convseration = await Conversation.create({
            participants: [firstUserId, secondUserId]
        })
    }

    return converstaion.populate("participants", "name profilePicture")
}

const listForUsers = async (userId, page = 1) =>{
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1)

    return Converstaion.find({participants: userId})
        .sort({lastMessage: -1, updatedAt: -1})
        .skip( (safePage - 1) * 20)
        .limit(20)
        .populate("participants", "name profilePicture")
        .populate({
            path: "lastMessage",
            select: "sender content attachment attachmentType createdAt"
        })
}


const isParticipant = async (conversationId, userId) => {
    Boolean (await Conversation.exists({
        _id: conversationId,
        participants: userId
    }))
}

module.exports = {getOrCreateDirect, listForUser, isParticipant}
