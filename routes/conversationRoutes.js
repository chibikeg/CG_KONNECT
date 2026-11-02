const express = require("express");
const { getOrCreateDirect, listConversation } = require("../controllers/conversationController");
const protect = require("../middlewares/auth");

const router = express.Router();

router.post("/direct", protect, getOrCreateDirect);
router.get("/", protect, listConversation);


module.exports = router;
