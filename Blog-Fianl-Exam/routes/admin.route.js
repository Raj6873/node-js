const express = require("express")

const route = express.Router();

const { adminregister, loginadmin, alladmindata,deleteadmin } = require("../controller/Admin.controller");
const auth = require("../middleware/auth.middleware")

// adminregister
route.post("/admin/register", adminregister)

// loginadmin
route.post("/admin/login", loginadmin)

// alladmindata
route.get("/admin/alladmin", auth, alladmindata)

// // deletedata
route.delete("/admin/deleteadmin", auth, deleteadmin)


module.exports = route;