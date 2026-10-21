const asyncHandler = require("../helpers/asyncHandler");
const authService = require("../services/authService");

const register = asyncHandler (async(req, res) => {
    const data = await authService.register(req.body);
    res.status(201).json({success: true, data});
});

const login = asyncHandler (async(req, res) => {
    const data = await authService.login(req.body);
    res.status(200).json({success: true, data});
});

const getCurrentUser = asyncHandler (async(req, res) => {
    res.status(200).json({success: true, data: {user: authService.toPublicUser(req.user)}});
});

module.exports = {register, login, getCurrentUser}