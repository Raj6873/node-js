const Admin = require('../model/adminModel')
const path = require('path')
const fs = require('fs')


module.exports.logIn = async (req, res) => {
    try {
        return res.render('logIn')
    } catch (error) {
        console.log(error);
        return res.redirect('back')

    }
}


module.exports.dashboard = async (req, res) => {
    try {
        return res.render('dashboard')
    } catch (error) {
        console.log(error);
        return res.redirect('dashboard')

    }
}

module.exports.addAdmin = async (req, res) => {
    try {

        return res.render('addAdmin')
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

module.exports.inserAdminRecords = async (req, res) => {
    try {
        console.log(req.body);
        var adminImage = '';
        if (req.file) {
            adminImage = await Admin.imagePath + '/' + req.file.filename
        }
        req.body.image = adminImage
        req.body.name = req.body.fname + ' ' + req.body.lname

        await Admin.create(req.body);
        return res.redirect('/viewAdmin')
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

module.exports.viewAdmin = async (req, res) => {
    try {
        var viewAdmin = await Admin.find();
        if (viewAdmin) {
            return res.render('viewAdmin', {
                viewAdmin
            })
        }
        else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        let deleteData = await Admin.findById(id);
        if (deleteData) {
            const deletePath = path.join(__dirname, '..', deleteData.image)
            fs.unlinkSync(deletePath)
        }
        await Admin.findByIdAndDelete(id);
        return res.redirect('back')
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

module.exports.editAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        let editData = await Admin.findById(id);
        let FLname = await editData.name.split(' ')
        return res.render('editAdmin', {
            editData,
            FLname
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

exports.editAdminRecords = async (req, res) => {
    try {
        if (req.file) {
            let singleData = await Admin.findById(req.body.id)
            let oldImgPath = path.join(__dirname, '..', singleData.image)
            if (oldImgPath) {
                fs.unlinkSync(oldImgPath)
            } else {
                console.log("image not found...");
            }
            req.body.name = req.body.fname + ' ' + req.body.lname;
            req.body.image = Admin.imagePath + '/' + req.file.filename;
            await Admin.findByIdAndUpdate(req.body.id, req.body);
            return res.redirect('/viewAdmin')
        }
        else {
            let singleData = await Admin.findById(req.body.id)
            req.body.name = req.body.fname + ' ' + req.body.lname;
            req.body.image = singleData.image;
            await Admin.findByIdAndUpdate(req.body.id, req.body);
            return res.redirect('/viewAdmin')
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}