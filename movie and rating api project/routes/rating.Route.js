const express = require("express");

const route = express.Router();

const upload = require("../middlware/admin.Multer");
const adminAuth = require("../middlware/admin.Auth");
;

console.log("rating routing is called...");

const { } = require("../controller/movie.controller")



module.exports = route;