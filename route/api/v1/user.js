const express = require("express")
const router = express.Router()
const User_api = require("../../../controllers/api/v1/user_api")

router.post("/create-session", User_api.Create_token) 


module.exports = router