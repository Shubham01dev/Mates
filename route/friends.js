const express = require('express');
const router = express.Router();
const FriendController = require("../controllers/FriednsController")

router.post("/create",FriendController.Friends); 
router.post("/accept",FriendController.Friendship); 


module.exports = router