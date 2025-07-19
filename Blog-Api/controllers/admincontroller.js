const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const moment = require("moment");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const fs = require('fs');
const { log } = require("console");


// adminAdminregister
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

// adminAdminlogin
const Adminlogin = async (req, res) => {
    try {
        const adminUserdata = await adminModel.findOne({
            username: req.body.email,
        });

        if (adminUserdata) {
            if (await bcrypt.compare(req.body.password, adminUserdata.password)) {
                const token = JWT.sign(
                    { adminUserdata: adminUserdata },
                    "Admin@raj123",
                    { expiresIn: "1h" }
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
                        "Admin@raj123",
                        { expiresIn: "1h" }
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

// adminAdminProfile
const AdminProfile = async (req, res) => {
    try {
        res.status(200).json({ msg: "adminprofile data ...? ", profile: req.user });
    } catch (e) {
        res.status(400).json({ msg: "somethin went wrong....? ", error: e })
    }
}

// adminchangePassword
const changePassword = async (req, res) => {

    try {
        console.log(req.user)
        if (!bcrypt.compare(await req.body.cuurent_password, req.user.password)) {
            res.status(201).json({ changePassword: false, msg: "cuurent_password is not matched...?" })
        }

        console.log('====================================');
        console.log("hello");
        console.log('====================================');

        if (req.body.cuurent_password == req.body.new_password) {
            res.status(201).json({ changePassword: false, msg: "cuurent_password and new-password  is  match...?" })
        }

        console.log('====================================');
        console.log("world");
        console.log('====================================');

        if (req.body.new_password != req.body.conform_password) {
            res.status(201).json({ changePassword: false, msg: "new-password and conform_password  is not match...?" })
        }


        console.log('====================================');
        console.log("helloworld");
        console.log('====================================');

        req.body.new_password = await bcrypt.hash(req.body.new_password, 10)

        console.log('====================================');
        console.log(req.body.new_password);
        console.log('====================================');

        const updatepassword = await adminModel.findByIdAndUpdate(req.user._id, {
            password: req.body.new_password,
        })

        console.log('====================================');
        console.log("jayhoo");
        console.log('====================================');

        return (updatepassword)
            ? res.status(201).json({ changePassword: true, msg: "password is  chnaged....?" })

            : res.status(201).json({ changePassword: true, msg: "password is not chnaged....?" })
    } catch (e) {
        res.status(201).json({ msg: "somthing went wrong....?", error: e })
    }
};

// adminforgetpassword
const forgetpassword = async (req, res) => {
    try {
        const admindata = await adminModel.findOne({ email: req.body.email });

        if (!admindata)
            res.status(201).json({ forgetpassword: false, msg: "email is invalid...?" })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akoliyaraj62@gmail.com',
                pass: 'dfmckhcmjfohfkes'
            }
        });

        const OTP = Math.floor(Math.random() * 100000);
        console.log(OTP)

        const mail = {
            from: '"Akoliya Infotech" <akoliyaraj62@gmail.com>',
            to: req.body.email,
            html: ` <!DOCTYPE html>
                <html>
                <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Password Reset OTP</title>
                <style>
                    body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f4f6f8;
                    margin: 0;
                    padding: 0;
                    }

                    .email-wrapper {
                    max-width: 550px;
                    margin: 40px auto;
                    background-color: #ffffff;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
                    border: 1px solid #ddd;
                    }

                    .email-header {
                    background-color: #3e628aff;
                    color: white;
                    padding: 24px 20px;
                    text-align: center;
                    }

                    .email-header h1 {
                    margin: 0;
                    font-size: 24px;
                    font-weight: 600;
                    }

                    .email-body {
                    padding: 30px 25px;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #333;
                    }

                    .email-body p {
                    margin: 12px 0;
                    }

                    .otp-box {
                    margin: 25px 0;
                    padding: 18px;
                    background-color: #eef4ff;
                    border: 2px dashed #0b3366ff;
                    border-radius: 10px;
                    text-align: center;
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 10px;
                    color: #578ed6ff;
                    }

                    .email-footer {
                    background-color: #f1f1f1;
                    padding: 15px;
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    border-top: 1px solid #e0e0e0;
                    }

                    @media (max-width: 600px) {
                    .email-wrapper {
                        margin: 20px;
                    }

                    .otp-box {
                        font-size: 24px;
                        letter-spacing: 6px;
                    }
                    }
                </style>
                </head>
                <body>

                <div class="email-wrapper">
                    <div class="email-header">
                    <h1>Akoliya Infotech</h1>
                    </div>
                    <div class="email-body">
                    <p>Hello,</p>
                    <p>You requested to reset your password. Please use the OTP below to proceed:</p>

                    <div class="otp-box">${OTP}</div>

                    <p>This OTP is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone.</p>
                    <p>If you did not request this change, you can safely ignore this email or contact our support team immediately.</p>
                    
                    <p>Best regards,<br><strong>Akoliya  Infotech Team</strong></p>
                    </div>
                    <div class="email-footer">
                    &copy; 2025 Akoliya Infotech. All rights reserved.
                    </div>
                </div>

                </body>
                </html>

        `, // HTML body
        };

        const info = await transporter.sendMail(mail)
        if (info.messageId) {
            res.status(201).json({ forget: true, msg: "OTP is successfully", OTP: OTP })
        }

        else {
            res.status(201).json({ forget: false, msg: "OTP sent went Failed....?", })
        }


    } catch (e) {
        res.status(201).json({ msg: "somthing went wrong....?", error: e })
    }
}

const fetchAdmin = async (req, res) => {
    try {
        const allAdminData = await adminModel.find({});

        if (allAdminData) {
            res.status(200).json({ status: true, msg: "allAdminData Fetchin successfully...?", allAdminData: allAdminData })
        } else {
            res.status(200).json({ status: false, msg: "allAdminData Fetched in notsuccessfully...?", allAdminData: allAdminData })
        }
    } catch (e) {
        res.status(201).json({ msg: "somthing went wrong....?", error: e })
    }
}
const updateAdmin = async (req, res) => {

}
const updatestatusAdmin = async (req, res) => {
    try {
        const admindata = await adminModel.findById(req.body.id);
        if (!admindata) {
            res.status(200).json({ status: false, msg: "Admin Data not found...?" });
        }

        console.log("status...?", admindata.status);

        admindata.status = !admindata.status;
        req.body.updated_date = moment().format("DD/MM/YYYY,h:mm A");

        console.log("upadated date",updated_date);

        const updatestatus = await adminModel.findByIdAndUpdate(req.body.id, {
            status: admindata.status,
            updated_date: updated_date,
        })

        if (updatestatus) {
            res.status(200).json({ status: true, msg: "Admin Data is status changed..?" });
        }
        else {
            res.status(200).json({ status: false, msg: "Admin Data not not changed...?" });
        }

    } catch (e) {
        res.status(201).json({ msg: "somthing went wrong....?", error: e })
    }
}

const deletadmin = async (req, res) => {
    try {

        const admindata = await adminModel.findById(req.body.id)

        if (!admindata) {
            res.status(200).json({ status: false, msg: "Admin Data not found...?" });
        }

        fs.unlinkSync(admindata.image);

        const deletadmindata = await adminModel.findByIdAnDelet(req.body.id);

        if (deletadmindata) {

            res.status(200).json({ status: true, msg: "Admin Data Deleted in Successfully...?" });
        } else {
            res.status(200).json({ status: false, msg: "Admin Data Deleteion falied...?" });
        }
    } catch (e) {
        res.status(201).json({ msg: "somthing went wrong....?", error: e });

    }
}
module.exports = {
    Adminregister,
    Adminlogin,
    AdminProfile,
    changePassword,
    forgetpassword,
    fetchAdmin,
    updateAdmin,
    updatestatusAdmin,
    deletadmin,

};
