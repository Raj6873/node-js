const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/adminProjectRevision')
const db = mongoose.connection;
db.once('open', (err) => {
    if (err) {
        console.log(err);

    } else {
        console.log("DB is connected");

    }
})
module.exports = db
