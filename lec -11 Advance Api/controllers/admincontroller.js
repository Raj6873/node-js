const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const moment = require("moment");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer")


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
        if (!bcrypt.compare(await req.body.cuurent_password, req.user.password)) {
            res.status(201).json({ changePassword: false, msg: "cuurent_password is not matched...?" })
        }

        if (req.body.cuurent_password == req.body.new_password) {
            res.status(201).json({ changePassword: false, msg: "cuurent_password and new-password  is  match...?" })
        }

        if (req.body.new - password != req.body.conform_password) {
            res.status(201).json({ changePassword: false, msg: "new-password and conform_password  is not match...?" })
        }

        req.body.new_password = await bcrypt.hash(req.bood.new_password, 10)
        const updatepassword = await adminModel.findbyIdandUpadet(req.user._id, {
            password: req.body.new_password,
        })

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
        const admindata = await adminModel.findOne({ email: req.body.emai });

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
            html: `<!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f3f5;
              padding: 0;
              margin: 0;
            }
            .email-container {
              max-width: 500px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background-color: #004aad;
              padding: 20px;
              color: #fff;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 30px 25px;
              color: #333;
              font-size: 16px;
              line-height: 1.6;
            }
            .otp-box {
              margin: 20px 0;
              padding: 15px;
              background-color: #f0f4ff;
              border: 2px dashed #004aad;
              border-radius: 8px;
              text-align: center;
              font-size: 24px;
              letter-spacing: 5px;
              font-weight: bold;
              color: #004aad;
            }
            .footer {
              padding: 15px;
              text-align: center;
              font-size: 12px;
              color: #888;
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Sarkar Infotech</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You requested to reset your password. Please use the following OTP to proceed:</p>
              <div class="otp-box">${OTP}</div>
              <p>This OTP is valid for the next 10 minutes. Do not share it with anyone.</p>
              <p>If you did not request this, please ignore this email or contact our support.</p>
              <p>Thanks,<br />Sarkar Infotech Team</p>
            </div>
            <div class="footer">
              &copy; 2025 Sarkar Infotech. All rights reserved.
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
            res.status(201).json({forget: true, msg: "OTP sent went Failed....?",  })
        }


    } catch (e) {
        res.status(201).json({ msg: "somthing went wrong....?", error: e })
    }
}
module.exports = {
    Adminregister,
    Adminlogin,
    AdminProfile,
    changePassword,
    forgetpassword,
};
