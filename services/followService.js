const Follow = require("../models/Follow");
const User = require("../models/User")

const follow = async (followerId, followingId) =>{
    if(followerId.toString() === followingId.toString()){
        const error = new Error("You canot follow yourself");
        error.statusCode = 400;
        throw error;
    }

    if(!(await User.exists({_id: followingId, isActive: true}))){
        return null
    }

    return Follow.findByIdAndUpdate(
        {follower: followerId, following: followingId},
        {$setOnInsert: {follower: followerId, following: followingId}},
        {upsert: true, new: true, setDefaultOnInsert: true}
    )
}

const unfollow = async (followerId, followingId) =>{
    Follow.findOneAndDelete({follower: followerid, following: followingId})
}

const getFollowers = async (userId, page = 1) =>{
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1)

    return Follow.find({following: userId})
        .sort({createdAt: -1})
        .skip( (safePage - 1) * 20)
        .limit(20)
        .populate("follower", "name profilePicture");
}

const getFollowing = async (userId, page = 1) =>{
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1)

    return Follow.find({following: userId})
        .sort({createdAt: -1})
        .skip( (safePage - 1) * 20)
        .limit(20)
        .populate("follower", "name profilePicture");
}

module.exports = {follow, unfollow, getFollowers, getFollowing}