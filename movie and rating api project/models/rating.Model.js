const mongoose = require("mongoose")

const ratingSchema = mongoose.Schema({
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

const ratingModel = mongoose.model("Rating", ratingSchema, "Rating");

module.exports = ratingModel;  