const express = require("express");

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

// logout
// router.post('/api/logout', (req, res) => {
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error('Error destroying session:', err);
//         return res.status(500).json({ message: 'Could not log out, please try again' });
//       }
      
//       // Clear the session cookie
//       res.clearCookie('connect.sid', { path: '/' });
//       res.redirect('http://localhost:5173/');
//     });
//   } else {
//     // If not using sessions, just send a success response
//     // The front-end should handle clearing any stored tokens
//     res.redirect('http://localhost:5173/');
//   }
// });

router.post('/api/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      return res.status(500).json({ message: 'Logout failed', error: err.message });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});


module.exports = router;