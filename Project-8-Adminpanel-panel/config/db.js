const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/Admin-Panel-Password-Reset');

const db = mongoose.connection;

db.on('connected', (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`db is connected`);
})

module.exports = db;