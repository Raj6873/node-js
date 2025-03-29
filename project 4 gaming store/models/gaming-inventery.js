const mongoose = require('mongoose');

// MongoDB Schema
const gameSchema = mongoose.Schema({
    game_name: {
        type: String,
        required: true,
    },
    game_genner: {
        type: String,
        required: true,
    },
    game_date: {
        type: Number,
        required: true,
    },
    game_image: {
        type: String,
        required: true,
    },
})

// MongoDB Model
const game = mongoose.model('gaming-invetery', gameSchema);

module.exports = game;