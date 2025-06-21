const express = require('express')
const db =require('./config/db')

const app = express()
const port = 2580

app.use(express.urlencoded({extended:true}));

app.use("/",require("./routes/index"))

app.listen(port, (err) => {
    if (err) {
        console.log("server is not conected...?", err)
        return false;
    }
    console.log("server is stated....?",port)
});