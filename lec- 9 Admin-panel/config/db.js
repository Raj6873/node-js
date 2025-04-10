const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/Admin-Panel";

mongoose.connect(URI);

const db = mongoose.connection;

db.on('connected', () => {
    console.log("DB Connected...");
})
db.on('error', (err) => {
    console.log("DB not Connected...", err);
})
db.on('disconnected', () => {
    console.log("DB DisConnected...");
})

module.exports = db;