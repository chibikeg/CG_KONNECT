const express = require("express");
const { getProfile, searchUsers, updateProfile } = require("../controllers/userController");
const protect = require("../middlewares/auth");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.get("/search", protect, searchUsers);
router.put("/profile", protect, updateProfile);


module.exports = router;
