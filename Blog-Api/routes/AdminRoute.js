const express = require('express');

const route = express.Router();

const upload = require('../middlware/adminMulter');
const adminAuth = require("../middlware/adminAuth");

console.log("admin routing is called...");

const { Adminregister, Adminlogin, AdminProfile, changePassword, forgetpassword, fetchAdmin, updateAdmin, updatestatusAdmin, deletadmin } = require("../controllers/admincontroller");

// adminresgister
route.post("/register", upload.single('image'), Adminregister);

// adminlogin
route.post("/login", Adminlogin);

// adminprofile
route.get("/profile", adminAuth, AdminProfile);

// adminchangepassword
route.post("/changePassword", adminAuth, changePassword);

route.post("/forgetpassword", adminAuth, forgetpassword);

route.get("/fetchAdmin", adminAuth, fetchAdmin);

route.delete("/deletadmin", adminAuth, deletadmin)

route.patch("/updatestatusAdmin", adminAuth, updatestatusAdmin)

route.patch("/updateAdmin", adminAuth, updateAdmin)

module.exports = route;
