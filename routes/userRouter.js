const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/user");

const {
  saveRedirectUrl,
  validateUser
} = require("../middleware");

router
  .route("/signup")
  .get(userController.signupForm)
  .post(
    validateUser,
    wrapAsync(userController.signup)
  );

router
  .route("/login")
  .get(userController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
