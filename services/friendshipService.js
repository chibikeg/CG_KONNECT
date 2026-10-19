const Friendship = require("../models/Friendship")
const User = require("../models/User")

const sendRequest = async (requesterId, recipientId) => {
    if(requesterId.toString() === recipientId.toString()){
        const error = new Error ("You cannot send a friend request to yourself");
        error.statusCode = 400;
        throw error
    }

    if(!(await User.exists({_id: recipientId, isActive: true}))){
        return null;
    }

    const exisiting = await Friendship.findOne({
        $or:[
            {requester: requesterId, recipient: recipientId},
            {requester: recipientId, recipient: requesterId}
        ]
    })

    if(exisiting){
        const error = new Error ("A friendship request or connection already exists");
        error.statusCode = 409;
        throw error;
    }

    return Friendship.create({
        requester: requesterId,
        recipient: recipientId
    })
}

const respondToRequest = async (requestId, recipientId, status) =>{
    if(!["accepted", "declined"].includes(status)){
        const error = new Error("status mst be accepted or declined");
        error.statusCode = 400;
        throw error;
    }

    return Friendship.findOneAndUpdate({
        _id: requestId,
        recipient: recipientId,
        status: "pending"
    },
    {status},
    {new: true, runValidators: true}
)
}

const removeFriendship = async (friendshipId, userId) => {
    Friendship.findOneAndDelete({
        _id: friendshipId,
        $or: [{requester: userId}, {recipient: userId}]
    })
}

const listForUser = async(userId, status = "accepted", page = 1) => {
    const safePage = Math.max(Number.parseInt(page, 10) || 1,1);
    const filter = {
        $or: [{requester: userId}, {recipient: userId}]
    };

    if(status) filter.status = status;

    return Friendship.find(filter)
        .sort({updatedAt: -1})
        .skip((safePage - 1) * 20)
        .limit(20)
        .populate("requester", "name profilePicture")
        .populate("recipient", "name profilePicture");
}

module.exports = {
    sendRequest,
    respondToRequest,
    removeFriendship,
    listForUser
}