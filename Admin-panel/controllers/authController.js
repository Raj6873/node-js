// zxta rvhx cjvn wntx

const adminModel = require('../model/adminModel');
const nodemailer = require('nodemailer');

const loginPage = (req, res) => {
    console.log("done");

    if (res.locals?.users) {
        return res.redirect('/dashboard');
    }
    return res.render('login');
}

const registerPage = (req, res) => {
    return res.render('register');
}

const forgetPasswordPage = (req, res) => {
    return res.render('forgetPassword');
}

const loginUser = async (req, res) => {
    try {
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const registeruser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        await adminModel.create({
            name: name,
            email: email,
            password: password
        });

        console.log('data registered !');
        return res.redirect('/')

    } catch (err) {
        console.log(err);
        return false;
    }
}

const dashPage = (req, res) => {
    return res.render('dashboard');
}

const logOutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
};

const forgetPassword = async (req, res) => {
    try {
        const { useremail } = req.body;
        let user = await adminModel.findOne({ email: useremail });
        if (!user) {
            console.log("Email and Password not valid");
            return res.redirect('/');
        }
        let otp = Math.floor(Math.random() * 1000000);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akoliyaraj62gmail@gmail.com',
                pass: 'pjnwbmvubkotgmqo'
            }
        });
        var mailOptions = {
            from: 'akoliyaraj62gmail@gmail.com',
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
                res.cookie('userotp', userotp);
                console.log('Email sent: ' + info.response);
                return res.redirect('/otp')
            }
        });
    } catch (err) {
        console.log(err);
        return false;
    }

}

const otpPage = (req, res) => {
    return res.render('otp')
}

const userOtp = (req, res) => {
    let otp = req.body.otp;
    let postOtp = req.cookies.userotp?.otp;
    console.log(req.body);  
    
    if (otp == postOtp) {
        console.log(`otp is correct`);
        return res.redirect('/resetPasswordPage');
    }
    else {
        console.log('otp not matched');
        return res.redirect('/otp');
    }
}

const resetPasswordPage = (req, res) => {
    return res.render('resetPassword');
}

const resetPassword = async (req, res) => {
    try {
        const { newpassword, cpassword } = req.body;
        if (newpassword == cpassword) {
            let useremail = req.cookies.postOtp?.email;
            await adminModel.findOneAndUpdate({ email: useremail }, { password: newpassword });
            res.clearCookie('postOtp');
            return res.redirect('/');
        }
        else {
            console.log('new password and confirm password not matched');
            return res.redirect('/resetPassword');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    loginPage,
    registerPage,
    registeruser,
    dashPage,
    loginUser,
    logOutUser,
    forgetPasswordPage,
    forgetPassword,
    otpPage,
    userOtp,
    resetPasswordPage,
    resetPassword,

}