const mongoose = require("mongoose")

const managerSchema = mongoose.Schema({
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
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);
const managerModel = mongoose.model("manager", managerSchema, "manager");

module.exports = managerModel;