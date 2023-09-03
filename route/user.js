const express = require("express")
const passport = require("passport")
const userController = require("../controllers/userController")
const  router = express.Router()
const passportStrategy = require("../config/passort-local-strategy") 


router.get("/profile/:id", passportStrategy.CheckAuthentication, userController.profile )

// SingIn
router.get("/singIn", userController.singIn)

router.post("/singIn/Create_session",passportStrategy.authenticate(
    "local",
    {failureRedirect: "/user/singIn"},
) ,userController.Create_session)

// SinUp
router.get("/singUp", userController.singUp)

router.post("/singUp/create", userController.Create)

// update

router.post("/update/:id", passportStrategy.CheckAuthentication, userController.update)

// Logout
router.get("/singOut", userController.destory)
 
// Google Authenticaters

router.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: "/user/singIn"}), userController.Create_session);

// reset password
router.get("/reset_password", userController.resetPassword)
router.post("/new_password", userController.newPassword)
router.post("/update_password", userController.updatePassword)



module.exports = router