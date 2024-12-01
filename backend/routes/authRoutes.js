const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate GitHub authentication
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// Route to handle GitHub OAuth callback
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to your frontend
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
  }
);

// Route to get the current authenticated user
router.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Route to logout
router.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Logged out' });
  });
});

module.exports = router;