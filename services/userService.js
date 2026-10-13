const User = require("../models/User")

const editableFields = [
    "name",
    "profilePicture",
    "phone",
    "location",
    "bio"
]

const getById = async (userId) =>(
    User.findById(userId).select("-password")
)

const search = async (query, page = 1) => {
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

    return User.find({ 
        isActive: true,
        $or: [
            {name: {$regex: escapeQuery, $options: "i"}},
            {email: {$regex: escapeQuery, $options: "i"}}
        ]
    })
        .select("name profilePicture bio")
        .sort({name: 1})
        .skip((safePage - 1) * 10)
        .limit(10)
}

const updateProfile = async (userId, updates) =>{
    const safeUpdates = Object.fromEntries(
        Object.entries(updates).filter(([key]) => editableFields.includes(key))
    )

    return User.findByIdAndUpdate(userId, safeUpdates, {
        new: true,
        runValidators: true
    }).select("-password")
};

module.exports = {getById, search, updateProfile}