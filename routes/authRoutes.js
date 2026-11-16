const express = require("express");
const { register, verifyEmail, resendVerificationCode, login, getCurrentUser } = require("../controllers/authController");
const protect = require("../middlewares/auth");
const validate = require("../middlewares/validation");
const { registerSchema, verifyEmailSchema, resendVerificationCodeSchema, loginSchema } = require("../validators/authValidator");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);
router.post("/resend-verification-code", validate(resendVerificationCodeSchema), resendVerificationCode);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, getCurrentUser);

module.exports = router;
