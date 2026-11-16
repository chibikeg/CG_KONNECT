const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().trim().min(3).max(100).required(),
    email: Joi.string().trim().email().max(254).required(),
    password: Joi.string().min(6).max(128).required()
});

const verifyEmailSchema = Joi.object({
    email: Joi.string().trim().email().max(254).required(),
    code: Joi.string().length(6).pattern(/^\d+$/).required()
});

const resendVerificationCodeSchema = Joi.object({
    email: Joi.string().trim().email().max(254).required()
});

const loginSchema = Joi.object({
    email: Joi.string().trim().email().max(254).required(),
    password: Joi.string().min(1).required()
});

module.exports = { registerSchema, verifyEmailSchema, resendVerificationCodeSchema, loginSchema };
