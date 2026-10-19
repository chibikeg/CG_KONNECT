const Like = require("../models/Like");
const Post = require("../models/Post");

const likePost = async (postId, userId) => {
    if(!(await Post.exists({_id: postId}))) return null;

    return Like.findOneAndUpdate(
        {post: postId, user: userId},
        {$setOnInsert: {post: postId, user: userId}},
        {upsert: true, new: true, setDefaultOnInsert: true}
    )
},

const unlikePost = async (postId, userId) => {
    Like.findOneAndDelete({post: postId, user: userId})
}

const getCount = async (postId) =>{
    Like.countDocuments({post: postId})
}

const hasLiked = async(postId, userId) =>{
    Boolean(await Like.exists({post: postId, user: userId}))
}

module.exports = {likePost, unlikePost, getCount, hasLiked};