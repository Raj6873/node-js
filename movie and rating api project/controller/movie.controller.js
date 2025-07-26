const movieModel = require("../models/movie.Model");
const raingModel = require("../models/rating.Model");
// const JWT = require("jsonwebtoken")
// const bcrypt = require("bcrypt");
const moment = require("moment");

// add movie Data
const addmovie = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required." });
        }
        const movie = await movieModel.create({ title, description });
        res.status(201).json({ status: true, movie, message: "Movie added successfully." });
    } catch (err) {
        res.status(400).json({ status: false, error: err.message });
    }
};

// Fetch all movies
const fetchAllMovies = async (req, res) => {
    try {
        const movies = await movieModel.find();
        res.status(200).json({ status: true, movies });
    } catch (err) {
        res.status(400).json({ status: false, error: err.message , message: "Failed to fetch movies." });
    }
};

// upadet movie Data
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updated = await movieModel.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ status: false, message: "Movie not found." });
        }
        res.status(200).json({ status: true, movie: updated, message: "Movie updated successfully." });
    } catch (err) {
        res.status(400).json({ status: false, error: err.message });
    }
};

// Delete movie
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await movieModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ status: false, message: "Movie not found." });
        }
        res.status(200).json({ status: true, message: "Movie deleted successfully." });
    } catch (err) {
        res.status(400).json({ status: false, error: err.message, message: "Movie delete failed." });
    }
};

module.exports = {
    addmovie,
    deleteMovie,
    fetchAllMovies,
    updateMovie
}