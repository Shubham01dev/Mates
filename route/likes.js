const express = require('express');
const router = express.Router();
const LikesController = require("../controllers/LikesController");


router.post("/toggle",LikesController.toggleLike);


module.exports = router