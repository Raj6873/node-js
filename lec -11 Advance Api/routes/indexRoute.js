const express = require("express");
const route = express.Router();

console.log("Routing is connected...");

route.use("/admin", require("./AdminRoute"));
route.use("/employe", require("./employeRote"));
route.use("/manger", require("./mangerRoute"));

module.exports = route;
