const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;

    const review = await Review.create({
      user: req.user._id,
      movie: movieId,
      rating,
      comment,
    });

    // Update average rating
    const reviews = await Review.find({ movie: movieId });
    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Movie.findByIdAndUpdate(movieId, { averageRating: average });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: 'Error adding review', error: err.message });
  }
};

exports.likeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    review.likes += 1;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: 'Error liking review', error: err.message });
  }
};

exports.dislikeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    review.dislikes += 1;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: 'Error disliking review', error: err.message });
  }
};

exports.getTopRatedMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ averageRating: -1 }).limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch top movies', error: err.message });
  }
};
