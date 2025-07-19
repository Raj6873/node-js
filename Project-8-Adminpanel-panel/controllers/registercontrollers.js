const { Cookie } = require('express-session');
const registerModel = require('../models/registermodel');
const nodemailer = require('nodemailer');

const login = (req, res) => {
    if (res.locals.users) {
        return res.redirect('/dashbord');
    }
    return res.render('login');
}

const register = (req, res) => {
    return res.render('register');
}

const registerUser = async (req, res) => {
    try {
        let user = await registerModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        req.flash('success', 'User register')
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const dashbord = (req, res) => {
    return res.render('dashbord');
}

const loginuser = (req, res) => {
    return res.render('dashbord');
}

const profile = (req, res) => {
    return res.render('profile');
}

const updaterUser = async (req, res) => {
    try {
        let editid = await registerModel.findById(req.body.editid);
        let user = await registerModel.findByIdAndUpdate(req.body.editid, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const logout = async (req, res) => {
    req.logout((error) => {
        if (error) {
            console.log(error);
            return false;
        }
        return res.redirect('/');
    })
}

const forgetpassword = (req, res) => {
    return res.render('forgetpassword');
}

const resetpassword = async (req, res) => {
    try {
        let email = req.body.mailemail;
        let otp = Math.floor(Math.random() * 100000);

        let transpoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akoliyaraj62@gmail.com',
                pass: 'pjnwbmvubkotgmqo'
            }
        })

        let mailemail = {
            from: 'akoliyaraj62@gmail.com',
            to: email,
            subject: "your Otp",
            html: `<h4>Please enter the following code on the page where you dropped your resume: </h4>
                   <h1>${otp} </h1>
                  `
        }

        transpoter.sendMail(mailemail, function (error, info) {
            if (error) {
                console.log(error);
                return false;
            }
            else {
                console.log("Otp Sent Sucessfully...");
                res.cookie('otp', {
                    email, otp
                });
                return res.redirect('/otp');
            }
        })

    } catch (error) {
        console.log(error);
        return false;
    }
}

const otp = (req, res) => {
    return res.render('otp');
}

const postOtp = async (req, res) => {
    let userotp = req.body.otp
    if (userotp == req.cookies['otp'].otp) {
        return res.redirect('newpassword');
    } else {
        console.log("Otp is Wrong");
        return res.redirect('back')
    }
}

const newpassword = (req, res) => {
    return res.render('newpassword');
}

const addpassword = async (req, res) => {
    try {
        let email = req.cookies['otp'].email;
        if (req.body.newpassword == req.body.cnewpassword) {
            let update = await registerModel.findOneAndUpdate({ email: email }, {
                password: req.body.newpassword
            })
            console.log("passwordupdate");
            res.clearCookie('otp');
            return res.redirect('/');
        } else {
            console.log("both password are not same");
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    login, register, registerUser, dashbord, loginuser, profile, updaterUser, logout, forgetpassword, resetpassword, otp, postOtp, newpassword, addpassword
})