const mongoose = require('mongoose');

// MongoDB Schema
const studentSchema = mongoose.Schema({
    game_name: {
        type: String,
        required: true,
    },
    game_genner: {
        type: Number,
        required: true,
    },
    game_date: {
        type: String,
        required: true,
    },
    game_image: {
        type: String,
        required: true,
    }
})

// MongoDB Model
const student = mongoose.model('students', studentSchema);

module.exports = student;