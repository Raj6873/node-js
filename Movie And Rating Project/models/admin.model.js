const mongoose = require("mongoose");

const authenticationSchema = new mongoose.Schema(
    {
        username: String,
        email: {
            type: String,
            unique: true,
        },
        password: String,
        phone: String,
        role: {
            type: String,
            enum: ["Admin", "User"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Admins", authenticationSchema, "Admins");
