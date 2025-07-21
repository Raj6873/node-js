const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
    console.log(req.body);

    try {
        if (await Admin.findOne({ email: req.body.email }))
            res
                .status(401)
                .json({ status: false, error: "Email is already exists, enter new email" });

        req.body.password = await bcrypt.hash(req.body.password, 10);

        (await Admin.create(req.body))
            ? res
                .status(201)
                .json({ status: true, success: "Admin Registration Successfull" })
            : res
                .status(401)
                .json({ status: false, error: "Admin Registration Failed..Solve the error" });
    } catch (error) {
        res.status(400).json({
            status: false,
            error: "Something went wrong...",
            error_data: error,
        });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const currentUser = await Admin.findOne({ email: req.body.email });

        if (!currentUser) {
            res.status(401).json({ status: false, error: "Email not found..." });
        }

        if (await bcrypt.compare(req.body.password, currentUser.password)) {
            const token = jwt.sign(
                { current_user: currentUser },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.status(201).json({
                status: true,
                success: "User Login Successfully...",
                Admin: currentUser,
                auth_token: token,
            });
        } else
            res.status(401).json({ status: false, error: "Password is wrong..." });
    } catch (e) {
        res.status(400).json({
            status: false,
            error: "Something went wrong...",
            error_data: e,
        });
    }
};

exports.allAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({ status: true, admins });
    } catch (error) {
        res.status(400).json({
            status: false,
            error: "Something went wrong...",
            error_data: error,
        });
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.body.id);
        if (deletedAdmin) {
            res.status(200).json({ status: true, success: "Admin deleted successfully" });
        } else {
            res.status(404).json({ status: false, error: "Admin not found" });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            error: "Something went wrong...",
            error_data: error,
        });
    }
};
exports.updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.body.id,
            req.body,
        );
        if (updatedAdmin) {
            res.status(200).json({ status: true, success: "Admin updated successfully", updatedAdmin });
        } else {
            res.status(404).json({ status: false, error: "Admin not found" });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            error: "Something went wrong...",
            error_data: error,
        });
    }
};