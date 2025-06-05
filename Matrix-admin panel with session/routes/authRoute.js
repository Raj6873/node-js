const express = require('express');
const routes = express.Router();
const { loginPage, registerPage, dashboardPage, registerUser, loginUser, logoutUser, forgotPassword, otp, postOtp, newPasswordPage, postNewpassword } = require('../controller/AuthController');
const passport = require('passport');

routes.get('/', loginPage)
routes.get('/register', registerPage)
routes.get('/dashboard', dashboardPage)
routes.post('/registeruser', registerUser)
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/' }), loginUser)
routes.get('/logout', logoutUser)
routes.post('/forgotpassword', forgotPassword)
routes.get('/otp', otp);
routes.post('/postotp', postOtp);
routes.get('/newpassword', newPasswordPage);
routes.post('/postnewpassword', postNewpassword)

module.exports = routes;