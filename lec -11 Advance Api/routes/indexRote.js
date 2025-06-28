const express = require("express")

const route = express.Router();

console.log("routing is conected ....?")
app.use("/admin", require("./routes/indexRote"))
app.use("/employe", require("./routes/employeRote"))
app.use("/manger", require("./routes/mangerRoute"))

module.exports = route;