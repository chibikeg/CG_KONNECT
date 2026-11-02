const express = require("express");
const { getFeed, createPost, getPost, updatePost, deletePost } = require("../controllers/postController");
const protect = require("../middlewares/auth");

const router = express.Router();

router.get("/feed", protect, getFeed);
router.post("/", protect, createPost);
router.get("/:id", protect, getPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
