const express = require("express")
const router = express.Router()
const Post_api = require("../../../controllers/api/v2/post_api")

router.post("/", Post_api.index)


module.exports = router