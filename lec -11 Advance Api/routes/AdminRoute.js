const express = require('express');
const route = express.Router();
const upload = require('../middlware/adminMulter');

console.log("admin routing is called...");

const { Adminregister } = require("../controllers/admincontroller");

route.post("/register", upload.single('image'), Adminregister);

module.exports = route;
