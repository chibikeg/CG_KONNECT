const asyncHandler = require("../helpers/asyncHandler");
const postService = require("../services/postService");

const getFeed = asyncHandler(async (req, res) => {
    const data = await postService.getFeed(req.user._id, req.query.page);
    res.status(200).json({success: true, data})
})

const createPost = asyncHandler(async (req, res) => {
    const data = await postService.createPost(req.user._id, req.body);
    res.status(201).json({success: true, data: {post}})
})

const getPost = asyncHandler(async(req, res)=>{
    const post = await postService.getPostForViewer(req.user._id, req.params.postId);

    if (!post){
        return res.status(404).json({success: false, message: "Post not found"});
    }
    return res.status(200).json({success:true, data: {post}})
})

const updatePost = asyncHandler(async (req, res) => {
    const data = await postService.updateOwnPost(req.user._id, req.body, req.params.postId);
    res.status(200).json({success: true, data: {post}})
})

const deletePost = asyncHandler(async (req, res) => {
    const data = await postService.deleteOwnPost(req.user._id, req.params.postId);
    res.status(200).json({success: true, message: "Post deleted suucessfully"})
})

module.exports = {getFeed, createPost, getPost, updatePost, deletePost}