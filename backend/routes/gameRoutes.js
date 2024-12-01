const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.sendStatus(401);
  }
};

// GET user details
router.get("/api/user", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      id: user._id,
      name: user.name,
      profilePicture: user.profilePicture,
      highscore: user.highscore,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE high score
router.put("/api/score", isAuthenticated, async (req, res) => {
  const { score } = req.body;
  if (typeof score !== "number") {
    return res.status(400).json({ error: "Invalid score" });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (score > user.highscore) {
      user.highscore = score;
      await user.save();
    }
    res.json({
      name: user.name,
      profilePicture: user.profilePicture,
      highscore: user.highscore,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET leaderboard
router.get("/api/leaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ highscore: -1 })
      .limit(10)
      .select("name highscore");

    const totalCount = await User.countDocuments();
    const result = { leaderboard, totalCount };
    res.json(result);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

module.exports = router;