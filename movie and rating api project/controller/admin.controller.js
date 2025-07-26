const adminModel = require("../models/admin.Model");
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const moment = require("moment");

// AdminRegister
const AdminRegister = async (req, res) => {
    try {
        console.log(req.body)
        const data = await adminModel.findOne({ email: req.body.email });

        console.log(data);

        if (data) {
            return res.status(401).json({ status: false, error: "Email is Allreday exits...?" });
        }
        req.body.password = await bcrypt.hash(req.body.password, 11);

        req.body.image = req.file.path;

        req.body.status = true;
        const newdata = (await adminModel.create(req.body))
        if (newdata) {
            res.status(201).json({ status: true, success: "Username is register successfully.....?" })
        }
        else {
            res.status(401).json({ status: false, error: "user register in failed...?" })
        }
    } catch (err) {
        res.status(400).json({ error: "semothing went wrong" })
    }
}
// Adminlogin
const Adminlogin = async (req, res) => {
    try {
        console.log(req.body)
        const currentUser = await adminModel.findOne({ email: req.body.email });

        if (!currentUser) {
            return res.status(404).json({ status: false, error: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, currentUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, error: "Incorrect password." });
        }

        const token = JWT.sign(
            {currentUser: currentUser},
            process.env.JWT_Secret,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            status: true,
            message: "Admin Login successfully...?.",
            user: {
                id: currentUser._id,
                email: currentUser.email,
            },
            auth_token: token,
        });

    } catch (err) {
        res.status(400).json({ error: "Something went wrong.", err });
    }
};
// fetchadminall
const fetchadminall = async (req, res) => {
    try {
        const alladmin = await adminModel.find({});

        if (alladmin) {
            res.status(200).json({
                status: true,
                admin: alladmin,
            });
        } else {
            res.status(200).json({
                status: false,
                admin: {},
                error: "No admin data found.",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: false, error: "Something went wrong.",
        });
    }
};

// admindelet
const admindelet = async (req, res) => {
    try {
        const deletedata = await adminModel.findByIdAndDelete(req.body.id);

        if (deletedata) {
            res.status(200).json({
                status: true,
                success: "User Deleted..",
                user: deletedata
            });
        } else {
            res.status(404).json({
                status: false,
                success: "User Deletion Failed.. User not found.",
            });
        }
    } catch (e) {
        res.status(400).json({
            status: false,
            error: "Something went wrong...",
            error_data: e.message || e,
        });
    }
};

module.exports = {
    AdminRegister,
    Adminlogin,
    fetchadminall,
    admindelet
}