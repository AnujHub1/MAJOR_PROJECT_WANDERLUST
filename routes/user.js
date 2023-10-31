const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../Util/wrapAsync.js");
const passport = require("passport");
const { isloggedIn, saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSingUpForm)
.post( wrapAsync(userController.signUp));

router.route("/login")
.get(userController.renderloginForm)
.post(saveRedirectUrl, 
   passport.authenticate("local",
   {failureRedirect : "/login",
   failureFlash: true}),
   userController.login);


router.get("/logout" ,userController.logout)

module.exports = router;