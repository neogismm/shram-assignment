const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');
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
  `https://shram-assignment-production.up.railway.app/auth/github/callback`,
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.redirect(`${process.env.FRONTEND_URL}/login/success?token=${token}`);
  }
);

module.exports = router;