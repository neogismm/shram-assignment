const express = require("express");
const User = require("../models/User");

const router = express.Router();

// GET user details
router.get("/api/user", async (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user.id,
      name: req.user.name,
      profilePicture: req.user.profilePicture,
      highscore: req.user.highscore,
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// UPDATE high score
router.put("/api/score", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }
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
    result = { leaderboard, totalCount };
    res.json(result);
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
