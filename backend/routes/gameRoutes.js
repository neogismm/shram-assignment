const express = require("express");
const User = require("../models/User");

const router = express.Router();

// GET user details
router.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      name: req.user.name,
      profilePicture: req.user.profilePicture,
      highscore: req.user.highscore,
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// UPDATE high score
router.post("/api/score", async (req, res) => {
  if (req.isAuthenticated()) {
    const { score } = req.body;
    if (score > req.user.highscore) {
      req.user.highscore = score;
      await req.user.save();
    }
    res.json({ highscore: req.user.highscore });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// GET leaderboard
router.get("/api/leaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ highscore: -1 })
      .limit(10)
      .select("name highscore");

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

router.post("/api/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Logout failed", error: err.message });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

module.exports = router;
