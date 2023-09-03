const express = require("express")
const router = express.Router()
const Post_api = require("../../../controllers/api/v1//post_api")
const Passort = require("passport")

router.post("/", Post_api.index)
router.delete("/:id", Passort.authenticate("jwt", {session: false}),Post_api.delete)


module.exports = router