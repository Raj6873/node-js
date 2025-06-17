const express = require('express');

const route = express.Router();

console.log("Routing is stated...?")

const { fetchdatauser
    , insertdatauser
    , deletdatauser,
    upadetdatauser
} = require('../controllers/usercontroller');

// fetchdatauser
route.get("/user", fetchdatauser)

// insertdatauser
route.post("/user", insertdatauser)

// upadetdatauser
route.patch("/user/:id", upadetdatauser)

// deletdatauser
route.delete("/user/:id", deletdatauser)

route.use("/student", require("./studentRouter"));

module.exports = route;