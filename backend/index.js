const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const User = require("./models/User.js");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport GitHub strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          user = new User({
            githubId: profile.id,
            name: profile.displayName,
            profilePicture: profile.photos[0].value,
            highScore: 0,
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// Auth routes
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173/game");
  }
);

// Game API routes
app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      name: req.user.name,
      profilePicture: req.user.profilePicture,
      highScore: req.user.highScore,
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

app.post("/api/score", async (req, res) => {
  if (req.isAuthenticated()) {
    const { score } = req.body;
    if (score > req.user.highScore) {
      req.user.highScore = score;
      await req.user.save();
    }
    res.json({ highScore: req.user.highScore });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
