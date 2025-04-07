const mongoose = require('mongoose');
const path = require('path');

const gameSchema = new mongoose.Schema({
    game_name: {
        type: String,
        required: true
    },
    game_gener:{
        type: String,
        required: true
    },
    game_date:{
        type : Number,
        required : true, 
    },
    game_image:{
        type : String,
        required : true, 
    },
});
module.exports = mongoose.model('game', gameSchema);
