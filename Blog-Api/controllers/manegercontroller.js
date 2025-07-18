
const bcrypt = require("bcrypt")
const moment = require("moment")
const nodemailer = require("nodemailer");
const managerModel = require('../models/managerModel')


const Registermaneger = async (req, res) => {
    try {
        if (await managerModel.findOne({ username: req.body.username }))
            res.status(201).json({ status: false, msg: "username is already exited...?" });

        if (await managerModel.findOne({ email: req.body.email }))
            res.status(201).json({ status: false, msg: "email is already exited...?" });

        req.body.image = req.file.path;

        const password = req.body.password;

        req.body.password = await bcrypt.hash(req.body.password, 13);

        req.body.created_date = moment().format("DD/MM/YYYY,h:mm:ss A")
        req.body.created_date = moment().format("DD/MM/YYYY,h:mm:ss A")
        req.body.status = true;

        const newmaneger = await managerModel.create(req.body)


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akoliyaraj62@gmail.com',
                pass: 'dfmckhcmjfohfkes'
            }
        });

        const mail = {
            from: '"Akoliya Infotech" <akoliyaraj62@gmail.com>',
            to: req.body.email,
            subject: "Login Credentials - Akoliya Infotech Panel",
            html: `<!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f0f2f5;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 550px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              background-color: #004aad;
              color: white;
              padding: 25px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 26px;
            }
            .content {
              padding: 30px;
              color: #333;
              font-size: 16px;
              line-height: 1.6;
            }
            .credentials {
              background-color: #f5f7ff;
              border: 1px dashed #004aad;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .credentials p {
              margin: 10px 0;
              font-weight: bold;
            }
            .btn {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 25px;
              background-color: #004aad;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            }
            .footer {
              background: #f1f1f1;
              padding: 15px;
              font-size: 12px;
              color: #777;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Akoliya Infotech</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>Welcome to Akoliya Infotech Panel. Below are your login credentials:</p>

              <div class="credentials">
                <p>👤 Username: <span style="font-weight:normal;">${req.body.username}</span></p>
                <p>👤 Email: <span style="font-weight:normal;">${req.body.email}</span></p>
                <p>🔒 Password: <span style="font-weight:normal;">${password}</span></p>
              </div>

              <p>You can login using the button below:</p>
              <a class="btn" href="https://exam.rnwmultimedia.edu.in/login" target="_blank">Login to Panel</a>

              <p>If you have any trouble logging in, please contact our support team.</p>
              <p>Thanks,<br>Akoliya Infotech Team</p>
            </div>
            <div class="footer">
              &copy; 2025 Akoliya Infotech. All rights reserved.
            </div>
          </div>
        </body>
      </html>`,
        };

        await transporter.sendMail(mail);

        if (newmaneger) {
            res.status(201).json({ status: true, msg: "Register maneger login in successfully....?" });
        }
        else {
            res.status(201).json({ status: false, msg: "Register maneger  in login failed...?" });
        }

    } catch (e) {
        res.status(400).json({ msg: "Something went wrong...", error: e });
    }

}

const allfetchmanager = async (req, res) => {
  try {
    const allmanager = await managerModel.find({});

    if (allmanager) {
      res.status(200).json({
        status: true,
        msg: "All Managers fetched in Succesfully...",
        allmanager: allmanager  ,
      });
    } else {
      res.status(200).json({
        status: false,
        msg: "All Not Managers fetched...?",
      });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong...", error: e });
  }
};

module.exports = {
    Registermaneger,
    allfetchmanager,
}