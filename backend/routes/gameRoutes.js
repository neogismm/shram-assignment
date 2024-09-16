const express = require("express");
const User = require("../models/User");
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// GET user details
router.get("/api/user", authenticateJWT, async (req, res) => {
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
router.put("/api/score", authenticateJWT, async (req, res) => {
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

router.post("/api/logout", (req, res) => {
  // With JWT, logout is handled client-side by removing the token
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;