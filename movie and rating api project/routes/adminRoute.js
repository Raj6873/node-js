const express = require("express");

const route = express.Router();

const upload = require('../middlware/adminMulter');
const adminAuth = require("../middlware/adminAuth");
;

console.log("admin routing is called...");

const { AdminRegister,Adminlogin,fetchadminall,admindelet} = require("../controller/admincontroller")

route.post("/register",upload.single('image'),AdminRegister)

route.post("/login",Adminlogin)

route.get("/fetchall",fetchadminall)

route.delete("/deletadmin",admindelet)

module.exports = route;