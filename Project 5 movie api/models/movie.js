const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movie_image: {
        type: String,
        required: true
    },
    movie_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { collection: 'users' }); // Specify the collection name

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
