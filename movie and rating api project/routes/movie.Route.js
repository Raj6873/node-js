const express = require("express");

const route = express.Router();

const upload = require("../middlware/admin.Multer");
const adminAuth = require("../middlware/admin.Auth");
;

console.log("admin movierouting is called...");

const { addmovie } = require("../controller/movie.controller")

route.post("/moviedata", addmovie)

module.exports = route;