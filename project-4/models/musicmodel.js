const mongoose = require('mongoose');
const path = require('path');

const musicSchema = new mongoose.Schema({
    album_name: {
        type: String,
        required: true
    },
    artist_name:
    {
        type: String,
        required: true
    },
    release_year:{
        type : Number,
        required : true, 
    },
    genre:{
        type : String,
        required : true, 
    },
    album_cover : {
        type : String,
        required : true ,
    }
});
module.exports = mongoose.model('Album', musicSchema);
