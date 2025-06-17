const express = require('express');

const route = express.Router();

console.log("student routing..?")

const {addstudent}=require("../controllers/studentcontroller");
const upload =require ("../middlware/studentMulter");

// insert all student

route.get("/addstudent", upload.single("image"), addstudent);
module.exports =route;