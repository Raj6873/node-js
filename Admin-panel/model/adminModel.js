const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type : String,
        default: "admin"
    }
});

const admin = mongoose.model('admin', adminSchema);

module.exports = admin;