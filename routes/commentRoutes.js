const express = require("express");
const { listComments, createComment, updateComment, deleteComment } = require("../controllers/commentController");
const protect = require("../middlewares/auth");

const router = express.Router();

router.get("/posts/:postId/comments", protect, listComments);
router.post("/posts/:postId/comments", protect, createComment);
router.put("/comments/:commentId", protect, updateComment);
router.delete("/comments/:commentId", protect, deleteComment);

module.exports = router;
