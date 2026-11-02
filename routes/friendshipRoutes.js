const express = require("express");
const { sendRequest, respondToRequest, removeFriendship, listFriendships } = require("../controllers/friendshipController");
const protect = require("../middlewares/auth");

const router = express.Router();

router.post("/requests", protect, sendRequest);
router.put("/requests/:requestId", protect, respondToRequest);
router.delete("/:friendshipId", protect, removeFriendship);
router.get("/", protect, listFriendships);

module.exports = router;
