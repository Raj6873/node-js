const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const moment = require("moment");
const JWT = require("jsonwebtoken")

const Adminregister = async (req, res) => {
    try {
        const { username, email, password, image } = req.body;

        const existingUsername = await adminModel.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({ register: false, msg: "Username already exists." });
        }

        const existingEmail = await adminModel.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ register: false, msg: "Email already exists." });
        }

        if (!req.file || !req.file.path) {
            return res.status(400).json({ register: false, msg: "Image file is required." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const now = moment().format("DD/MM/YYYY, h:mm:ss A");

        const newAdmin = await adminModel.create({
            ...req.body,
            password: hashedPassword,
            image: req.file.path,
            created_date: now,
            updated_date: now,
            status: true
        });

        return res.status(201).json({ register: true, msg: "Admin registered successfully." });

    } catch (e) {
        console.error(error);
        res.status(400).json({ msg: "Something went wrong...", error: e });
    }
};

const Adminlogin = async (req, res) => {
    try {
        const adminUserdata = await adminModel.findOne({
            username: req.body.email,
        });

        if (adminUserdata) {
            if (await bcrypt.compare(req.body.password, adminUserdata.password)) {
                   const token = JWT.sign(
                        { adminUserdata: adminUserdata }, 
                        "Admin@raj123"
                    );
                return res.status(201).json({ login: true, msg: "Login is Successful...?", token: token });
            } else {
                return res.status(201).json({ login: false, msg: "Password is incorrect." });
            }
        }

        else {
            const AdminEmailData = await adminModel.findOne({
                email: req.body.email
            });

            if (AdminEmailData) {
                if (await bcrypt.compare(req.body.password, AdminEmailData.password)) {

                    const token = JWT.sign(
                        { AdminEmailData: AdminEmailData }, 
                        "Admin@raj123"
                    );

                    return res.status(201).json({ login: true, msg: "Login is Successful....?", token: token });
                } else {
                    return res.status(201).json({ login: false, msg: "Password is incorrect." });
                }
            } else {
                return res.status(404).json({ login: false, msg: "User not found." });
            }
        }
    }
    catch (e) {
        console.error(e);
        return res.status(400).json({ msg: "Something went wrong..." });
    }
};

module.exports = {
    Adminregister,
    Adminlogin,
};
