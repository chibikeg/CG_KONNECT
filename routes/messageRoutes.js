const express = require("express");
const { sendMessage, listMessages, markRead } = require("../controllers/messageController");
const protect = require("../middlewares/auth");

const router = express.Router();

router.post("/conversations/:conversationId/messages", protect, sendMessage);
router.get("/conversations/:conversationId/messages", protect, listMessages);
router.put("/conversations/:conversationId/read", protect, markRead);

module.exports = router;
