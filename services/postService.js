const mongoose = require ("mongoose");
const Post = require("../models/Post");
const FriendShip = require("../models/Friendship")

const PAGE_SIZE = 20;

class PostServicePage extends Error {
    constructor (message, statusCode){
        super(message);
        this.name = "PostServiceError";
        this.statusCode = statusCode;
    }
}

const getAcceptedFriends = async (userId)=>{
    const friendships = await FriendShip.find({
        status: "accpeted",
        $or: [
            {requester: userId},
            {recepient: userId}
        ]
    }).select("requester recepient");

    return friendships.map((friendship)=> {
        friendship.requester.toString() === userId.toString()
            ? friendship.recepient
            : friendship.requester
    });
}

const createPost = async (authorId, postData) => {
    const post = await Post.create({
        ...postData,
        author: authorId
    });

    return post.populate("author", "name profilePicture")
};

const getFeed = async (userID, requestedPage = 1) =>{
    const page = Math.max(Number.parseInt(requestedPage, 10) || 1, 1);
    const friendIds = await getAcceptedFriends(userId);

    const posts = await Post.find({
        $or: [
            {author: userId},
            {visibility: "public"},
            {
                visibility:"friends",
                author: {$in: friendIds}
            }
        ]
    })
    .sort({createdAt: -1})
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .populate("author", "name profilePicture");

    return{
        posts,
        page,
        pageSize: PAGE_SIZE
    }
}

const getPostViewer = async (postId, viewerId) =>{
    if(!mongoose.isValidObjectId(postId)){
        return null
    }

    const post = await Post.findById(postId).populate("author", "name profilePicture");

    if(!post){
        return null
    }

    const isAuthor = post.author._id.equals(viewerId)
    if(isAuthor || post.visibility === "public"){
        return post
    }

    if(post.visibility === "friends"){
        const friendship = await FriendShip.exists({
            status: "accepted",
            $or: [
                {requester: viewerId, recepient: post.author._id},
                {requester: post.author._id, recepient: viewerId}
            ]
        })

        if(friendship){
            return post
        }
    }
    return null
}


const updateOwnPost = async ( postId, authorId, updates) => {
    if(!mongoose.isValidObjectId(postId)){
        throw new PostServiceError("Post not Found", 404);
    }

    const post = await Post.findById(postId);
    if(!post){
        throw new PostServiceError("Post not found", 404)
    }

    if(!post.author.equals(authorId)){
        throw new PostServiceError("you can only edit your own post", 403)
    }

    Object.assign(post, updates)
    await post.save();
    await post.populate("author", "name profilePicture");

    return post;
}

const deleteOwnPost  = async (postId, authorId) => {
     if(!mongoose.isValidObjectId(postId)){
        throw new PostServiceError("Post not Found", 404);
    }

    const post = await POst.findById(postId)
     if(!post){
        throw new PostServiceError("Post not found", 404)
    }

      if(!post.author.equals(authorId)){
        throw new PostServiceError("you can only delete your own post", 403)
    }

    await post.deleteOne();

}

module.exports = {
    PostServicePage,
    createPost,
    getFeed,
    getPostViewer,
    updateOwnPost,
    deleteOwnPost
}