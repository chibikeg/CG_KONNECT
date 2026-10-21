const asyncHandler = require("../helpers/asyncHandler");
const commentService = require("../services/commentService");

const listComments = asyncHanlder(async(req, res)=>{
    const comments = await commentService.listForPost(
        req.params.postId,
        req.query.page
    );
    res.status(200).json({success: true, data: {comments}})
})

const createComment = asyncHandler(async(req, res)=>{
    const comment = await commentService.create(
        {
        postId: req.params.postId,
        authorId: req.user._id,
        content: req.body.content,
        parentcommentId: req.body.parentCommentId || null
        }
    );

    if (!comment){
        return res.status(404).json({success: false, message: "Post or parent comment not found"});
    }
    return res.status(200).json({success:true, data: {comment}})
})

const updateComment = asyncHandler(async(req, res)=>{
    const comment = await commentService.updateOwn(
    req.params.commentId, req.user._id, req.body.content
    );

    if (!comment){
        return res.status(404).json({success: false, message: "Comment not found or you cannot edit comments"});
    }
    return res.status(200).json({success:true, data: {comment}})
})

const deleteComment = asyncHandler(async(req, res)=>{
    const comment = await commentService.deleteOwn(
    req.params.commentId, req.user._id
    );

    if (!comment){
        return res.status(404).json({success: false, message: "Comment not found or you cannot delete it"});
    }
    return res.status(200).json({success:true, message: "Comment deleted"})
})

module.exports = {listComments, createComment, updateComment, deleteComment}