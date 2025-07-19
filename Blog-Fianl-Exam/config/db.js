const mongoose = require("mongoose")

mongoose
    .connect(process.env.URI)
    .then((data) => {

        console.log("Db is connected..?")
    })
    .catch ((err) => {
        console.log("error", err)
    });