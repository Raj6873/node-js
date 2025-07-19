const express = require('express');
const AuthuserMulter =require("../middlware/AuthuserMulter")
const route = express.Router();

console.log("Routing is stated...?")

const {registerUserdata, loginUserdata}=require("../controllers/usercontroller")

route.post("/register",registerUserdata)
route.post("/login",loginUserdata)

route.use("/student", require("./studentRouter"));

module.exports = route;