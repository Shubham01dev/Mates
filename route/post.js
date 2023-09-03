const express = require('express');
const router = express.Router();
const PostController = require("../controllers/PostController");
const passport = require('passport');

router.post("/create", passport.CheckAuthentication , PostController.Create)
router.get("/delete/:id", passport.CheckAuthentication , PostController.delete)


module.exports = router;