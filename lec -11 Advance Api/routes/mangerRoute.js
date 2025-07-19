const express = require("express")

console.log("manger is conected ....?")

const route = express.Router();

const upload = require("../middlware/manegerMulter")
const { Registermaneger ,allfetchmanager} = require("../controllers/manegercontroller");
const adminAuth = require("../middlware/adminAuth");

route.post("/regsiter", adminAuth, upload.single('image'), Registermaneger);

route.get("/fetchmanager", adminAuth,  allfetchmanager);

module.exports = route;