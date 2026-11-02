const express = require("express");
const { likePost, unlikePost, getLikeStatus } = require("../controllers/likeController");
const protect = require("../middlewares/auth");

const router = express.Router();

router.post("/posts/:postId/likes", protect, likePost);
router.delete("/posts/:postId/likes", protect, unlikePost);
router.get("/posts/:postId/likes", protect, getLikeStatus);

module.exports = router;
