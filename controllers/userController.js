const asyncHandler = require("../helpers/asyncHandler");
const userService = require("../services/userService");

const getProfile = asyncHandler(async(req, res)=>{
    const user = await userService.getById(req.params.userId);

    if (!user){
        return res.status(404).json({success: false, message: "User not found"});
    }
    return res.status(200).json({success:true, data: {user}})
})

const searchUsers = asyncHandler(async(req, res)=>{
    const user = await userService.getById(req.query.q || "", req.query.page);

    return res.status(200).json({success:true, data: {user}})
})

const updateProfile = asyncHandler(async(req, res)=>{
    const user = await userService.updateProfile(req.body, req.user._id);

    if (!user){
        return res.status(404).json({success: false, message: "User not found"});
    }
    return res.status(200).json({success:true, data: {user}})
})

module.exports = {getProfile, searchUsers, updateProfile}