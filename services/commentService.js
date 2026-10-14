const Post = require("./postService");
const Comment = require('../models/Comment')

const listForPost = async(postId, page = 1) =>{
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);

    return Comment.find({post: postId}).sort({createdAt: 1}).skip((safePage - 1) * 20).limit(20).populate("author", "name profilePicture")
}

const createComment = async ({postId, authorId, content, parentCommentId = null}) =>{
    const post = await Post.findById(postId);

    if(!post) return null;

    if(parentCommentId){
        const parent = await Comment.findOne({
            _id: parentCommentId,
            post: postId
        })
        if(!parent) return null
    }

    const comment = await Comment.create({
        post: postId,
        author: authorId,
        content,
        parentComment: parentCommentId
    })

    return comment.populate("author", "name profilePicture")
}

const updateOwn = async (commentId, authorId, content) =>{
    const comment = await Comment.findOneAndUpdate(
        {_id: commentId, author: authorId},
        {content},
        {new: true, runValidator: true}
    ).populate("author", "name profilePicture");

    return comment
}

const deleteOwn = async (commentId, authorId) =>(
    Comment.findOneAndDelete({_id: commentId, author: authorId})
)

module.exports = {
    listForPost,
    createComment,
    updateOwn, 
    deleteOwn
}