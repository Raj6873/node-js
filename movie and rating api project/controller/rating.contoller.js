const ratingModel = require("../models/rating.Model");
const movieModel = require("../models/movie.Model");
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const moment = require("moment");

// Add  rating
const addRating = async (req, res) => {
    try {
        const { title, description, averageRating } = req.body;
       
        
        if (!title || !description || averageRating == null) {
            return res.status(400).json({ error: "title, description, and averageRating are required." });
        }
        
        const rating = await ratingModel.create({ title, description, averageRating });
        res.status(201).json({ status: true, rating, message: "Rating added successfully." });
    } catch (err) {
        res.status(400).json({ status: false, error: err.message , message: "Failed to add rating." });
    }
};


// Fetch all ratings
const fetchRatingsByMovie = async (req, res) => {
    try {
        const ratings = await ratingModel.find();
        res.status(200).json({ status: true, ratings, message: "Ratings fetched successfully." });
    } catch (err) {
        res.status(400).json({ status: false, error: err.message , message: "Failed to fetch ratings." });
    }
};
// Update a rating
const updateRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, averageRating } = req.body;
        const updated = await ratingModel.findByIdAndUpdate(
            id,
            { title, description, averageRating },
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ status: false, message: "Rating not found." });
        }
        res.status(200).json({ status: true, rating: updated, message: "Rating updated successfully." });
    } catch (err) {
        res.status(400).json({ status: false, error: err.message, message: "Failed to update rating." });
    }
};

// Delete a rating
const deleteRating = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ratingModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ status: false, message: "Rating not found." });
        }
        res.status(200).json({ status: true, message: "Rating deleted successfully." });
    } catch (err) {
        res.status(400).json({ status: false, error: err.message, message: "Failed to delete rating." });
    }
};
module.exports = {
    addRating,
    fetchRatingsByMovie,
    updateRating,
    deleteRating
};