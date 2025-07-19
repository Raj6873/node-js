const mongoose = require("mongoose");

const studentschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    }
});

const student = mongoose.model('student', studentschema);

module.exports = student;