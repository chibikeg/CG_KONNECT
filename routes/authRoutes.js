const express = require("express");
const { register, login, getCurrentUser } = require("../controllers/authController");
const protect = require("../middlewares/auth");
const validate = require("../middlewares/validation");
const { registerSchema, loginSchema } = require("../validators/authValidator");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, getCurrentUser);

module.exports = router;
