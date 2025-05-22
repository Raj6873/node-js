const express = require('express')
const Route = express.Router();
const AdminModel = require('../models/AdminModel')
const AdminCtl = require('../controllers/AdminControllers')

Route.get('/',AdminCtl.SignIn)
Route.post('/CheckSignIn',AdminCtl.CheckSignIn)
Route.get('/logout',AdminCtl.logout)

Route.get("/verfiyemail",(req,res)=>{
    res.render('forgetpass')
})
Route.post('/verfiyemailform',AdminCtl.verfiyemail)

Route.get('/dashboard',AdminCtl.dashboard)
Route.get('/addAdmin',AdminCtl.addAdmin)
Route.get('/changepassword',AdminCtl.changepassword)
Route.post('/changepasswords',AdminCtl.Changepasswords)

Route.post('/insertAdminRecord',AdminModel.uplodeAdminImage,AdminCtl.insertAdminRecord)
Route.get('/viewAdmin',AdminCtl.viewAdmin)
Route.get("/myProfile",AdminCtl.myProfile)
Route.get('/deleteAdmin/:id',AdminCtl.deleteAdmin)

Route.get('/updateAdmin/:id',AdminCtl.editAdmin)
Route.post('/EditAdminRecord',AdminModel.uplodeAdminImage,AdminCtl.EditAdminRecord)

Route.get('/verifyotp',AdminCtl.verifyotp)
Route.post('/verifyotps',AdminCtl.verifyotps)

Route.get('/checkforgetpass',AdminCtl.checkforgetpass)
Route.post('/checkforgotpassword',AdminCtl.checkforgotpassword)

module.exports = Route