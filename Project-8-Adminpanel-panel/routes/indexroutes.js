const express = require('express');

const routes = express.Router();

const registercontoller = require('../controllers/registercontrollers');
const categorycontoller = require('../controllers/categorycontrollers');
const subcategoryconteroolr = require('../controllers/subcatecontrollers');
const excategorycontrollers = require('../controllers/exsubcategorycontrollers');
const productcontroller = require('../controllers/producControllers');

const passport = require('passport');

//multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage }).single('image');

routes.get('/', registercontoller.login);
routes.get('/register', registercontoller.register);
routes.post('/registerUser', registercontoller.registerUser);
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/' }), registercontoller.loginuser);
routes.get('/dashbord', passport.checkUser, registercontoller.dashbord);
routes.get('/profile', registercontoller.profile);
routes.post('/updaterUser', registercontoller.updaterUser);
routes.get('/logout', registercontoller.logout);
routes.get('/tablecategery', categorycontoller.tablecategery);
routes.get('/formcategory', categorycontoller.formcategory);
routes.post('/Addcategory', categorycontoller.Addcategory);
routes.get('/deleterecord', categorycontoller.deleterecord);
routes.get('/editRecord', categorycontoller.editRecord);
routes.post('/updatecategory', categorycontoller.updatecategory);
routes.get('/forgetpassword', registercontoller.forgetpassword);
routes.post('/resetpassword', registercontoller.resetpassword);
routes.get('/otp', registercontoller.otp);
routes.post('/postOtp', registercontoller.postOtp);
routes.get('/newpassword', registercontoller.newpassword);
routes.post('/addpassword', registercontoller.addpassword);
routes.get('/tablesub', subcategoryconteroolr.tablesub);
routes.get('/formsub', subcategoryconteroolr.formsub);
routes.post('/Addsubcategory', subcategoryconteroolr.Addsubcategory);
routes.get('/deletesubrecord', subcategoryconteroolr.deletesubrecord);
routes.get('/editsubRecord', subcategoryconteroolr.editsubRecord);
routes.post('/Editsubcategory', subcategoryconteroolr.Editsubcategory);
routes.get('/extable', excategorycontrollers.extable);
routes.get('/exform', excategorycontrollers.exform);
routes.post('/exaddcategory', excategorycontrollers.exaddcategory);
routes.get('/deleteexrecord', excategorycontrollers.deleteexrecord);
routes.get('/editexRecord', excategorycontrollers.editexRecord);
routes.post('/updateExcategory', excategorycontrollers.updateExcategory);

//product

routes.get('/formproduct', productcontroller.formproduct);
routes.get('/tableproduct', productcontroller.tableproduct);
routes.post('/productadd', upload, productcontroller.productadd);
routes.get('/deleteproductrecord', productcontroller.deleteproductrecord);
routes.get('/editpeoductRecord', productcontroller.editpeoductRecord);
routes.post('/updateproduct', upload, productcontroller.updateproduct);


//status

routes.get('/categoryInstock', categorycontoller.categoryInstock);
routes.get('/categoryOutstock', categorycontoller.categoryOutstock);

routes.get('/categoryInstock', subcategoryconteroolr.categoryInstock);
routes.get('/categoryOutstock', subcategoryconteroolr.categoryOutstock);

routes.get('/categoryInstock', excategorycontrollers.categoryInstock);
routes.get('/categoryOutstock', excategorycontrollers.categoryOutstock);

routes.get('/categoryInstock', productcontroller.categoryInstock);
routes.get('/categoryOutstock', productcontroller.categoryOutstock);

module.exports = routes;