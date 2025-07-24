const express = require("express");

const route = express.Router();

const upload = require("../middlware/admin.Multer");
const adminAuth = require("../middlware/admin.Auth");
;

console.log("admin movierouting is called...");

const { addmovie, deleteMovie, fetchAllMovies ,updateMovie} = require("../controller/movie.controller")

// moviedata
route.post("/moviedata", addmovie)

// moviedeletdata
route.delete("/moviedeletdata/:id", deleteMovie)

// moviefetch
route.get("/moviefetch", fetchAllMovies)

// movieupdate
route.put("/movieupdate/:id", updateMovie)

module.exports = route;