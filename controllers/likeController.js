const asyncHandler = require("../helpers/asyncHandler");
const likeService = require("../services/likeService");

const likePost = asyncHandler(async(req, res)=>{
    const like = await likeService.likePost(req.user._id, req.params.postId);

    if (!like){
        return res.status(404).json({success: false, message: "Post not found"});
    }

    const count = await likeService.getCount(req.params.postId)

    return res.status(200).json({success:true, liked: true, count})
})

const unlikePost = asyncHandler(async(req, res)=>{
   await likeService.unlikePost(req.user._id, req.params.postId);
   const count = await likeService.getCount(req.params.postId)

    return res.status(200).json({success:true, count})
})

const getLikeStatus = asyncHandler(async(req, res)=>{
   const [liked, count] = await Promise.all([
    likeService.hasLiked(req.params.postId, req.user._id),
    likeService.getCount(req.params.postId)
   ])

    return res.status(200).json({success:true, data: {liked, count}})
})

module.exports = {likePost, unlikePost, getLikeStatus}