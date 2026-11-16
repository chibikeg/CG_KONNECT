const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const generateToken = require("../helpers/generateToken")
const otpService = require("./otpService");

const toPublicUser = (user) =>({
    id: user._id,
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
    phone: user.phone,
    location: user.location,
    bio: user.bio,
    role: user.role,
    isVerified: user.isVerified
})

const register = async ({name, email, password}) => {

    const normalizedEmail = email.toLowerCase();

    if(await User.exists({email: normalizedEmail})){
        const error = new Error("An account with this email already exists");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword
    })

    return {user: toPublicUser(user), token: generateToken(user._id)}

}

const verifyEmail = async ({ email, code}) => {
    const user = await User.findOne ({ email: email.toLowerCase()});

    if(!user){
        const error = new Error(" Invalid email or vsrification code");
        error.statusCode = 400;
        throw error;
    }

    if(user.isVerified){
        return { user: toPublicUser(user), token: generateToken(user._id)};
    }

    const isValid = await otpService.verifyCode(user._id, code);

    if(!isValid){
        const error = new Error(" Invalid email or vsrification code");
        error.statusCode = 400;
        throw error;
    }

    user.isVerified = true;
    await user.save();

    return {
        user: toPublicUser(user),
        token: generateToken(user._id)
    };
}

const resendVerificationCode = async ( {email}) => {
    const user = await User.findOne({ email: email.toLowerCase() });

    if(!user){
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }

    if(user.isVerified){
        const error = new Error("Email is already verified");
        error.statusCode = 403;
        throw error;
    }

    await otpService.sendVerificationCode(user);
    return {
        message: "Verification code sent to your email"
    }
}


const login = async ({email, password}) => {
    const user = await User.findOne({email: email.toLowerCase()}).select("+password");

    if(!user || !(await bcryptjs.compare(password, user.password))){
       const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    if(!user.isActive){
        const error = new Error("Your account is inactive");
        error.statusCode = 403;
        throw error;
    }

    if(!user.isVerified){
        const error = new Error("Please verify your email before logging in");
        error.statusCode = 403;
        throw error;
    }


    return {
        user: toPublicUser(user),
        token: generateToken(user._id)
    };
}

module.exports = {
    register, 
    verifyEmail,
    resendVerificationCode,
    login, 
    toPublicUser
}