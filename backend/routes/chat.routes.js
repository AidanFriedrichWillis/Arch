const express = require('express');
const router = express.Router();
var chatController = require("../controllers/chat.controller");

router.get("/", chatController.init);

module.exports = router;
