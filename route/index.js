const express = require("express")
const homeController = require("../controllers/homeController")

const router = express.Router();

router.get("/", homeController.home)

router.use( "/user", require("./user"),)

router.use("/post", require("./post"));

router.use("/comment", require("./comments"));

router.use("/Likes", require("./likes"));

router.use("/friends", require("./friends"));

// api

router.use("/api", require("./api"));


module.exports = router