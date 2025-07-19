const express = require('express');
const route = express.Router()

const { registerUserdata, loginUserdata } = require("../controllers/usercontroller");

route.post("/registerUserdata", registerUserdata)
route.post("/loginUserdata", loginUserdata)

module.exports = route;