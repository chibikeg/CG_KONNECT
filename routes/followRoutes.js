const express = require("express");
const { followUser, unfollowUser, getFollowing, getFollowers } = require("../controllers/followController");
const protect = require("../middlewares/auth");

const router = express.Router();

router.post("/users/:userId/follow", protect, followUser);
router.delete("/users/:userId/follow", protect, unfollowUser);
router.get("/users/:userId/following", protect, getFollowing);
router.get("/users/:userId/followers", protect, getFollowers);

module.exports = router;
