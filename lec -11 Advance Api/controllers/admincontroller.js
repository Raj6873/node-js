const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const moment = require("moment");

const Adminregister = async (req, res) => {
    try {
        console.log(req.body);
        console.log('====================================');
        console.log("Admin CTR");
        console.log('====================================');

        // Example logic
        // const { username, password } = req.body;
        // const hashedPassword = await bcrypt.hash(password, 10);
        // await adminModel.create({ username, password: hashedPassword, createdAt: moment().format() });

        res.status(200).json({ msg: "Admin registered (test)" });
    } catch (e) {
        res.status(400).json({ msg: "Something went wrong", error: e.message });
    }
};

module.exports = {
    Adminregister
};
