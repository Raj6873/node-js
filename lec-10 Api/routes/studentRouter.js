const express = require('express');

const upload =require ("../middlware/studentMulter");

const route = express.Router();

console.log("student routing..?")

const {addstudent,deletedatastudent,fetchdatastudent}=require("../controllers/studentcontroller");

// insert all student
route.post("/addstudent", upload.single("image"), addstudent);

// fetch allstudentdata 

route.get("/fetchdatastudent",fetchdatastudent);

// delet student
route.delete("/deletedatastudent/:id", deletedatastudent);


module.exports =route;