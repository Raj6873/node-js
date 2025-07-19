const express = require("express")
require("dotenv").config();
const db = require("./config/db")

const port = 2580;

const app = express()

app.use(express.urlencoded({extended:true}));
app.use("/",require("./routes/admin.route"))

app.listen(process.env.port,(err) => {
    if (err) {
        console.log("server is not conected...?");
        return false;
    }
    console.log("server is stated...?",
        process.env.port)
});