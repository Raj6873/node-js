const express = require('express');

const upload = require("../middlware/studentMulter");

const route = express.Router();


const { addstudent, deletedatastudent, fetchdatastudent, fetchSingleStudentdata, upadetdatastudent } = require("../controllers/studentcontroller");

// insert all student
route.post("/addstudent", upload.single("image"), addstudent);

// fetch allstudentdata 

route.get("/fetchdatastudent", fetchdatastudent);

// fetchSingleStudentdata
route.get("/fetchSingleStudentdata", fetchSingleStudentdata)

route.put("/upadetdatastudent/:id", upload.single("image"), upadetdatastudent)

// delet student
route.delete("/deletestudent/:id", deletedatastudent);


module.exports = route;