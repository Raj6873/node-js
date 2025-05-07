const express = require('express')
const routes = express.Router();
const adminCtl = require('../controller/adminCtl')
const adminModel = require('../model/adminModel')

routes.get('/', adminCtl.logIn)

// routes.post('/checkSignIn',adminCtl.checkSignIn)

routes.post('/dashboard', adminCtl.dashboard)

routes.get('/addAdmin', adminCtl.addAdmin)

routes.post('/inserAdminRecords', adminModel.uploadImgFile, adminCtl.inserAdminRecords)

routes.get('/viewAdmin', adminCtl.viewAdmin)

routes.get('/deleteAdmin/:id', adminCtl.deleteAdmin)

routes.get('/editAdmin/:id', adminCtl.editAdmin)

routes.post('/editAdminRecords', adminModel.uploadImgFile, adminCtl.editAdminRecords)

module.exports = routes