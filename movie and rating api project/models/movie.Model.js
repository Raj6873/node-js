const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    averageRating: {
        type: Number,
        default:0,
        required: true,
    },
},{
    timestamp:true
});

const movieModel = mongoose.model("Movie", movieSchema, "Movie");

module.exports = movieModel;  