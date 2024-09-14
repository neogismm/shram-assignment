const express = require("express");
const passport = require("passport");

const router = express.Router();

// login route
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// callback
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("https://shram-assignment-jet.vercel.app/");
  }
);




module.exports = router;
