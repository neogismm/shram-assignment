const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config()

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
    res.redirect(process.env.FRONTEND_URL);
  }
);




module.exports = router;
