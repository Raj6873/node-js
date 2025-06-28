const express = require('express')

console.log("admin routing is called....?")

const rouute = express.Router();

const adminAuth = require("../middlware/adminAuth");
const adminMlulter = require("../middlware/adminMulter");

const {
Adminregister
} = require("../controllers/admincontroller")

route.get("/register",Adminregister)

module.exports = route;