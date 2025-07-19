const admin = require("../models/admin.Model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");

exports.adminregister = async (req, res) => {
    try {
        console.log(req.body)
        const data = await admin.findOne({ email: req.body.email });

        console.log(data);
        
        if (data) {
        
          return  res.status(401).json({ status: false, error: "Email is Allreday exits...?" });
        }
           


        req.body.password = await bcrypt.hash(req.body.password, 11);

        (await admin.create(req.body))
            ? res.status(201).json({ status: true, success: "Username is register successfully.....?" })
            : res.status(401).json({ status: false, error: "user register in failed...?" })
    } catch (err) {
        res.status(400).json({
            status: false,
            error: "semothing went wrong",
            error_data: err,
        })
    }
}


exports.loginadmin = async (req, res) => {
    try {
        const currentUser = await admin.findOne({ email: req.body.email });

        if (!currentUser) {
            return res.status(404).json({ status: false, error: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, currentUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, error: "Incorrect password." });
        }

        const token = jwt.sign(
            { id: currentUser._id, email: currentUser.email },
            process.env.secret,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            status: true,
            message: "Login successful.",
            user: {
                id: currentUser._id,
                email: currentUser.email,
            },
            auth_token: token,
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            error: "Something went wrong.",
            error_data: err.message,
        });
    }
};

exports.alladmindata = async (req, res) => {
    try {
        const alladmin = await admin.find({});

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
        res.status(500).json({
            status: false,
            error: "Something went wrong.",
            error_data: err.message,
        });
    }
};


exports.deleteadmin = async (req, res) => {
    try {
        const deletedata = await admin.findByIdAndDelete(req.body.id);

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
