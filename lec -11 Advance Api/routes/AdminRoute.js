const express = require('express');

const route = express.Router();

const upload = require('../middlware/adminMulter');
const adminAuth = require("../middlware/adminAuth");

console.log("admin routing is called...");

const { Adminregister ,Adminlogin} = require("../controllers/admincontroller");

route.post("/register", upload.single('image'), Adminregister);
route.post("/login", Adminlogin);
module.exports = route;
