const crypto = require("crypto");
const {randomInt} = require("crypto");
const EmailOtp = require("../models/emailOtp");
const emailService = require("./emailService");

const OTP_LIFETIME_MS = 10 * 60 * 1000; // 10 minutes in milliseconds
const RESEND_WAIT_MS = 60 * 1000; // 1 minute in milliseconds
const MAX_ATTEMPTS = 5;

const hashCode = (userId, code) => crypto
    .createHmac("sha256", process.env.OTP_HASH_SECRET)
    .update(`${userId}:${code}`)
    .digest("hex");

const sendVerificationCode = async (user) => {
    const recentOtp = await EmailOtp.findOne({
        user: user._id,
        purpose: "verify_email",
        createdAt: { $gt: new Date(Date.now() - RESEND_WAIT_MS) }
    })

    if(recentOtp){
        const error = new Error("Please wait before requesting a new code.");
        error.statusCode = 429; // Too Many Requests
        throw error
    }

    const code = String(randomInt(0, 1000000)).padStart(6, "0");

    await EmailOtp.deleteMany({ user: user_id, purpose: "verify_email"});

    await EmailOtp.create({
        user: user._id,
        purpose: "verify_email",
        codeHash: hashCode(user._id, code),
        expiresAt: new Date(Date.now() + OTP_LIFETIME_MS)
    })

    try{
        await emailService.sendVerificationCode(user.email, user.name, code);
    } catch(error){
        await EmailOtp.deleteMany({ user: user_id, purpose: "verify_email"});
        throw error
    }
}

const verifyCode = async (userId, submittedCode) => {
    const otp = await emailOtp.findOne({
        user: userId,
        purpose: "verify_email",
        expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 })

    if(!otp || otp.attempts >= MAX_ATTEMPTS) return false

    const expected = buffer.from(otp.codeHash, "hex");
    const actual = buffer.from(hashCode(userId, submittedCode), "hex");
    const matches = expected.length === actual.length && crypto.timingSafeEqual(expected, actual);

    if(!matches){
        otp.attempts += 1;
        await otp.save();
        return false;
    }

    await EmailOtp.deleteMany({ user: user_id, purpose: "verify_email"});
    return true
}


module.exports = {
    sendVerificationCode,
    verifyCode
}