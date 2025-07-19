const express = require('express');
const router = express.Router();
const {
  addReview,
  likeReview,
  dislikeReview,
  getTopRatedMovies
} = require("../Controllers/movie.Controllers");

const { protect } = require("../middleware/auth.middleware");

router.post('/review', protect, addReview);
router.put('/review/:id/like', protect, likeReview);
router.put('/review/:id/dislike', protect, dislikeReview);
router.get('/top-rated', getTopRatedMovies);

module.exports = router;
