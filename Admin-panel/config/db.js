const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Admin_passportJS');

const db = mongoose.connection;

db.on('connected', (err) => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log('Database Is SuccessFully Connected !');
});

module.exports = db;