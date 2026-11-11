const asyncHandler = require("../helpers/asyncHandler");
const followService = require("../services/followService");

const followUser = asyncHandler(async (req, res) => {
    const follow = await followService.follow(req.User._id, req.params.userId);

    if (!follow) {
        return res.status(404).json({ success: false, message: "User not found"})
    }

    return res.status(200).json({ success: true, data: {follow}});
})

const unfollowUser = asyncHandler(async (req, res) => {
    await followService.unfollow(req.User._id, req.params.userId);

    return res.status(200).json({ success: true, message: "User unfollowed"});
})

const getFollowing = asyncHandler(async (req, res) => {
    const following = await followService.getFollowing(req.query.page, req.params.userId);

    return res.status(200).json({ success: true, data: {following}});
})

const getFollowers = asyncHandler(async (req, res) => {
    await followService.getFollowers(req.User._id, req.params.userId);

    return res.status(200).json({ success: true, data: {following}});
})

module.exports = {followUser, unfollowUser, getFollowing, getFollowers}