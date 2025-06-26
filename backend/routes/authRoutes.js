const express = require("express");
const passport = require("passport");
const { FRONT_URL } = require("../utils/url");

const authRoutes = express.Router();

// Route to start login
authRoutes.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Google callback
authRoutes.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/login",
  session: true,
}), (req, res) => {
  console.log("✅ LOGGED IN USER:", req.user); 
  res.redirect(`${FRONT_URL}/profile?id=${req.user._id}`);
});

module.exports = authRoutes;
