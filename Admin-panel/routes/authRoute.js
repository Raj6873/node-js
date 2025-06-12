const express = require('express');

const { registerPage, loginPage, loginUser, registeruser, dashPage, logOutUser, forgetPasswordPage, forgetPassword, otpPage, userOtp, resetPasswordPage, resetPassword } = require('../controllers/authController');

const routes = express.Router();

const passport = require('passport');

routes.get('/register', registerPage);
routes.get('/', loginPage);
routes.post('/loginUser', passport.authenticate('local', { failureRedirect: '/' }), loginUser)
routes.post('/registeruser', registeruser);
routes.get('/dashboard', passport.checkUser, dashPage);
routes.get('/logOut', logOutUser);

routes.get('/forgetPasswordPage', forgetPasswordPage);
routes.post('/forgetPassword', forgetPassword);

routes.get('/otp', otpPage);
routes.post('/userOtp', userOtp);

routes.get('/resetPasswordPage', resetPasswordPage);
routes.post('/resetPassword', resetPassword);

module.exports = routes;