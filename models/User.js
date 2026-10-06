const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [100, "Name must be at most 100 characters long"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false // Exclude password from query results by default
    },
    profilePicture:{
        type: String,
        default: ""
    },
    phone:{
        type: String,
        trim: true,
        default: ""
    },
    location: {
        type: String,
        trim: true,
        default: ""
    },
    bio: {
        type: String,
        maxlength: [500, "Bio must be at most 500 characters long"],
        default: ""
    },
    role: {
        type: String,
        enum: ["user", "admin", "seller"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})  

module.exports = mongoose.model("User", userSchema);