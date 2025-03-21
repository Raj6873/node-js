const mongoose = require('mongoose');

const emplooyeschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    }
})

const emplooye = mongoose.model('emplooye', emplooyeschema);

module.exports = emplooye;