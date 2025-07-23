const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/Movie-And-Rating-pr"

mongoose.connect(URI);

const db = mongoose.connection;

db.on("connected", (err) => {
    console.log("Database is Connected..?")
});
db.on('error', (err) => {
    console.log("Database is Connected..?",err)
});
db.on("Disconnected", (err) => {
    console.log("Database is DisConnected..?")
});

module.exports = db;