const bcrypt = require("bcryptjs");
const User = require("../models/User");
const asyncHandler = require("../helpers/asyncHandler");
const generateToken = require("../helpers/generateToken");

const publicUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
    phone: user.phone,
    location: user.location,
    bio: user.bio,
    role: user.role,
    isVerified: user.isVerified
});

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    if (await User.exists({ email: normalizedEmail })) {
        return res.status(409).json({
            success: false,
            message: "An account with this email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: normalizedEmail, password: hashedPassword });

    return res.status(201).json({
        success: true,
        data: { user: publicUser(user), token: generateToken(user._id) }
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (!user.isActive) {
        return res.status(403).json({ success: false, message: "Your account is inactive" });
    }

    return res.status(200).json({
        success: true,
        data: { user: publicUser(user), token: generateToken(user._id) }
    });
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json({ success: true, data: { user: publicUser(req.user) } });
});

module.exports = { register, login, getCurrentUser };
