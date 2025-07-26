const express = require("express");
const route = express.Router();

const upload = require("../middlware/admin.Multer");
const adminAuth = require("../middlware/admin.Auth");

const { addRating, fetchRatingsByMovie ,updateRating,deleteRating} = require("../controller/rating.contoller");

// Add a rating
route.post("/addrating", addRating);

// Fetch all ratings
route.get("/fetchrating", fetchRatingsByMovie);

// Update a rating
route.put("/updaterating/:id", updateRating);

// Delete a rating
route.delete("/deleterating/:id", deleteRating);

module.exports = route;