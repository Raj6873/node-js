const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  averageRating: { type: Number, default: 0 },
});

module.exports = mongoose.model('Movie', movieSchema);
