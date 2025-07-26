const mongoose = require("mongoose");

mongoose.connect(process.env.db_url);

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