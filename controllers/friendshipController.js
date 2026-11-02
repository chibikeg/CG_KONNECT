const asyncHandler = require("../helpers/asyncHandler");
const friendshipService = require("../services/friendshipService");

const sendRequest = asyncHandler(async (req, res) => {
    const friendship = await friendshipService.sendRequest(req.User._id, req.body.recipientId);

    if (!friendship) {
        return res.status(404).json({ success: false, message: "User not found"})
    }

    return res.status(200).json({ success: true, data: {friendship}});
})

const respondToRequest = asyncHandler(async (req, res) => {
    const friendship = await friendshipService.respondToRequest(req.params.recipientId, req.User._id, req.body.status);

    if (!friendship) {
        return res.status(404).json({ success: false, message: "Friend request not found"})
    }

    return res.status(200).json({ success: true, data: {friendship}});
})

const removeFriendship = asyncHandler(async (req, res) => {
    const friendship = await friendshipService.removeFriendship(req.params.friendshipId, req.User._id);

    if (!friendship) {
        return res.status(404).json({ success: false, message: "Friendship not found"})
    }

    return res.status(200).json({ success: true, message: "Friendship removed"});
})

const listFriendships = asyncHandler(async (req, res) => {
    const friendship = await friendshipService.listForUser(req.User._id, req.query.status || "accepted", req.query.page);

    return res.status(200).json({ success: true, data: {friendship}});
})

module.exports = {sendRequest, respondToRequest, removeFriendship, listFriendships}