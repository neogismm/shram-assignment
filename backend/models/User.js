const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: String,
  name: String,
  profilePicture: String,
  highScore: Number
});

module.exports = mongoose.model('User', userSchema);
