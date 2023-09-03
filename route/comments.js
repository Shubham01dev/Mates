const express = require('express');
const router = express.Router();
const comments = require('../controllers/commentController')
const passport = require("../config/passort-local-strategy")


router.post('/create', comments.create)
router.get('/delete/:id',passport.CheckAuthentication, comments.delete)


module.exports = router