const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
},{
    timestamp:true
});

const adminModel = mongoose.model("Admin", adminSchema, "Admin");

module.exports = adminModel;  