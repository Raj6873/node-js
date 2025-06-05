const UserModel = require('../models/UserModel');
const nodemailer = require('nodemailer');
const loginPage = (req, res) => {
    if (res.locals?.users) {
        return res.redirect('/dashboard');
    }
    return res.render('login');
}
const registerPage = (req, res) => {
    return res.render('register');
}
const dashboardPage = (req, res) => {
    return res.render('dashboard');
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        if (password == cpassword) {
            let user = await UserModel.create({
                name: name,
                email: email,
                password: password
            })
            console.log("user register");
            return res.redirect('/');
        } else {
            console.log("Password and Confirm password not match");
            return res.redirect('/register');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const loginUser = async (req, res) => {
    try {
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
}
const forgotPassword = async (req, res) => {
    try {
        const { useremail } = req.body;
        let user = await UserModel.findOne({ email: useremail });
        if (!user) {
            console.log("Email and Password not valid");
            return res.redirect('/');
        }
        let otp = Math.floor(Math.random() * 1000000);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akoliyaraj62@gmail.com',
                pass: 'bsta jrly enly idaw'
            }
        });
        var mailOptions = {
            from: 'akoliyaraj62@gmail.com',
            to: useremail,
            subject: 'Forgot Password',
            html: `<h1 style='color:green'>Your Otp :- ${otp}</h1>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                let userotp = {
                    otp: otp,
                    email: useremail
                }
                res.cookie('userotp', userotp)
                console.log('Email sent: ' + info.response);
                return res.redirect('/otp')
            }
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}
const otp = (req, res) => {
    return res.render('otp');
}
const postOtp = (req, res) => {
    let otp = req.body.otp;
    let userotp = req.cookies.userotp?.otp;
    if (otp == userotp) {
        return res.redirect('/newpassword')
    } else {
        console.log(`Otp is not match`);
        return res.redirect('/otp')
    }
}
const newPasswordPage = (req, res) => {
    return res.render('newpassword')
}
const postNewpassword = async (req, res) => {
    try {
        const { newpassword, cpassword } = req.body;
        if (newpassword == cpassword) {
            let useremail = req.cookies.userotp?.email;
            await UserModel.findOneAndUpdate({ email: useremail }, {
                password: newpassword
            })
            res.clearCookie('userotp');
            return res.redirect('/');
        } else {
            console.log(`Newpassword and Confirm Password not match`);
            return res.redirect('/newpassword');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    loginPage,
    registerPage,
    dashboardPage,
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    otp,
    postOtp,
    newPasswordPage,
    postNewpassword
}