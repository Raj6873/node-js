const express = require("express");

const route = express.Router();

const {
    registerAdmin, loginAdmin, allAdmins, deleteAdmin, updateAdmin
} = require("../controllers/admin.controller");

const authentication = require("../middleware/auth.middleware");

route.post("/register", registerAdmin);

route.post("/login", loginAdmin);

route.get("/allAdmins", authentication, allAdmins);

route.delete("/delete", authentication, deleteAdmin);

route.patch("/update", authentication, updateAdmin);

module.exports = route;