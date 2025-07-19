const AdminModel = require('../models/AdminModel')
const path = require('path');
const fs = require('fs');
const Admin = require('../models/AdminModel');
const nodemailer = require("nodemailer")

module.exports.SignIn = async (req, res) => {
    try {

        if (req.cookies.AdminData) {
            return res.redirect('/dashboard')
        }
        else {
            res.render('SignIn')
        }


    } catch (err) {
        console.log(err);
        res.redirect('back')
    }
}

module.exports.CheckSignIn = async (req, res) => {
    console.log(req.body);
    let isAdminExit = await AdminModel.find({ email: req.body.email })
    console.log(isAdminExit);

    try {
        if (isAdminExit.length == 1) {
            let isAdminExit1 = await AdminModel.findOne({ email: req.body.email })
            if (isAdminExit1.password == req.body.password) {
                res.cookie('AdminData', isAdminExit1);
                console.log(isAdminExit1);
                return res.redirect('/dashboard')
            } else {
                console.log("Password is incorrect")
                return res.redirect('back')
            }
        }
        else {
            console.log("Admin Email not found")
            res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        res.redirect('back')
    }

}

module.exports.myProfile = async (req, res) => {
    try {
        res.render('myprofile', { AdminDataa: req.cookies.AdminData })

    } catch (error) {
        console.log(err);
        res.redirect('back')
    }
}

module.exports.logout = (req, res) => {
    try {
        res.clearCookie('AdminData')
        return res.redirect('/')
    }
    catch {
        console.log(err)
        return res.redirect('back')
    }
}


module.exports.dashboard = (req, res) => {
    try {
        if (req.cookies.AdminData) {
            return res.render('Dashboard', {
                AdminDataa: req.cookies.AdminData
            })
        }
        else {
            return res.redirect('/')
        }
    }
    catch (err) {
        console.log(err);
        res.redirect('back')

    }
}


module.exports.addAdmin = (req, res) => {
    try {
        if (req.cookies.AdminData) {
            return res.render('addAdmin',
                {
                    AdminDataa: req.cookies.AdminData
                }
            )
        }
        else {
            return res.redirect('/')
        }

    }
    catch (err) {
        console.log(err);
        res.redirect('back')

    }
}
module.exports.updateAdmin = async (req, res) => {
    try {
        let id = await req.params.id;
        if (id) {
            let singleAdmin = await AdminModel.findById(id);
            return res.render('EditAdmin', {
                singleAdmin,
                AdminDataa: req.cookies.AdminData
            })
        }
        else {
            console.log("Admin not found")
            res.redirect('back')
        }
    }
    catch (err) {
        console.log(err)
        res.redirect('back')
    }

}
module.exports.viewAdmin = async (req, res) => {
    try {

        if (req.cookies.AdminData) {
            let AllAdminRecords = await AdminModel.find()
            res.render('ViewAdmin', {
                AllAdminRecords,
                AdminDataa: req.cookies.AdminData
            })
        }
        else {
            return res.redirect('/')
        }

    }
    catch (err) {
        console.log(err);
        res.redirect('back')

    }
}

module.exports.insertAdminRecord = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        var AdminImg = '';
        if (req.file) {
            AdminImg = AdminModel.imagePath + '/' + req.file.filename;
        }
        req.body.image = AdminImg
        req.body.name = req.body.fname + ' ' + req.body.lname;

        let AddAdminRecords = await AdminModel.create(req.body);
        if (AddAdminRecords) {
            console.log("Addmin Records Added Successfully");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        res.redirect('back')
    }
}
module.exports.deleteAdmin = async (req, res) => {
    console.log(req.params.id)
    let SingleObj = await AdminModel.findById(req.params.id);
    try {
        let oldPath = path.join(__dirname, '..', SingleObj.image)
        await fs.unlinkSync(oldPath)
    }
    catch (err) {
        console.log(err)
        res.redirect('back')
    }
    let deleteAdminRecord = await AdminModel.findById(req.params.id);
    if (deleteAdminRecord) {
        await AdminModel.findByIdAndDelete(req.params.id)
        console.log("Admin are deleted successfully")
        return res.redirect('back');
    }
    else {
        console.log("Admin not found");
        return res.redirect('back');
    }

}
module.exports.changepassword = async (req, res) => {
    try {
        res.render('changepassword', {
            AdminDataa: req.cookies.AdminData
        })
    }
    catch (err) {
        console.log(err)
        res.redirect('back')
    }
}
module.exports.Changepasswords = async (req, res) => {
    try {
        console.log(req.body)
        let AdminDatas = await AdminModel.findById(req.cookies.AdminData._id)
        console.log(AdminDatas);
        if (req.body.Oldpassword == AdminDatas.password) {
            if (req.body.Newpassword != req.body.Oldpassword) {
                if (req.body.Newpassword == req.body.Currentpassword) {
                    await AdminModel.findByIdAndUpdate(AdminDatas.id, { password: req.body.Newpassword })
                    console.log('ok')
                    res.redirect('/logout')
                }
                else {
                    console.log('new and conform errror')
                    res.redirect('back')
                }
            }
            else {
                console.log('current and new errror')
                res.redirect('back')
            }
        }
        else {
            console.log('current errror')
            res.redirect('back')
        }
    }
    catch (err) {
        console.log(err)
        res.redirect('back')
    }
}


module.exports.editAdmin = async (req, res) => {
    // let UpdataAdminData = await AdminModel.findById(req.params.id)
    // res.render('EditAdmin',
    //     UpdataAdminData
    // )
    let update = await AdminModel.find()
    // let updateFName = req.body.fname
    // let updateLName = req.body.lname
    console.log(update.fname);
    try {
        let id = await req.params.id;
        if (id) {
            let UpdataAdminData = await AdminModel.findById(id);
            return res.render('EditAdmin', {
                UpdataAdminData,
                update,
                AdminDataa: req.cookies.AdminData
            })
        }
        else {
            console.log("Admin not found")
            res.redirect('back')
        }
    }
    catch (err) {
        console.log(err)
        res.redirect('back')
    }
}
module.exports.EditAdminRecord = async (req, res) => {
    let SingleData = await AdminModel.findById(req.params.id)
    try {
        if (req.file) {
            try {
                let deleteImgPath = path.join(__dirname, '..', SingleData.image)
                await fs.unlinkSync(deleteImgPath)
            } catch (err) {
                console.log(err)
                res.redirect('back')
            }
            req.body.image = AdminModel.image + '/' + req.file.filename;
            let UpdateImgRecord = await AdminModel.findByIdAndUpdate(req.body.id, req.body);
            if (UpdateImgRecord) {
                console.log("Image updated successfully : " + UpdateImgRecord)
                return res.redirect('/ViewAdmin')
            }
            else {
                console.log("image not found : ");
                return res.redirect('back')
            }
        }
        else {

        }
    }
    catch (err) {
        console.log(err);
        res.redirect('back')
    }
}

module.exports.verfiyemail = async (req, res) => {
    try {
        let isAdminExit = await AdminModel.find({ email: req.body.email }).countDocuments();
        console.log(isAdminExit)
        if (isAdminExit == 1) {
            const isAdminExit = await AdminModel.findOne({ email: req.body.email })
            console.log(isAdminExit)

            const otp = Math.floor(Math.random() * 10000)
            console.log('otp', otp);
            res.cookie('otp', otp);
            res.cookie('email', isAdminExit.email);
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "akoliyaraj62@gmail.com",
                    pass: "micmgfdtxypcezwa",
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const info = await transporter.sendMail({
                from: 'akoliyaraj62@gmail.com',
                to: "akoliyaraj62@gmail.com",
                subject: "otp", // Subject line
                html: `<b>Here is your otp ${otp}</b>` // html body
            });
            console.log("otp send succcesfully:-", otp);

            console.log("Message sent: %s", info.messageId);

        }
        res.redirect('/verifyotp')
    }

    catch (err) {
        console.log(err);
        res.redirect('back')
    }

}

module.exports.verifyotp = async (req, res) => {
    try {
        res.render('verifyotp')

    }
    catch (err) {
        console.log(err);
        res.redirect('back')
    }
}

module.exports.verifyotps = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.cookies)
        if (req.body.otp = req.cookies.otp) {
            res.clearCookie('otp')
            return res.redirect('/checkforgetpass')

        }
        else {
            console.log("err")
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        res.redirect('back')
    }
}

module.exports.checkforgetpass = async (req, res) => {
    try {
        return res.render('checkforgetpass')
    }
    catch (err) {
        console.log(err);
        res.redirect('back')
    }
}

module.exports.checkforgotpassword = async (req, res) => {
    try {
        let singledata = await AdminModel.find({ email: req.cookies.email });
        console.log(singledata)
        if (singledata == 1) {
            console.log('okey');
            let singleadmindata = await AdminModel.findOne({ email: req.cookies.email })
            if (singleadmindata) {
                let checkforgetpass = await AdminModel.findByIdAndUpdate(singleadmindata.id, { password: req.body.newpassword })
                if (checkforgetpass) {
                    res.clearCookie('email')
                    return res.redirect('/')
                }
                else {
                    return res.redirect('back')
                }
            }
            else {
                console.log('no data find');
                return res.redirect('back')
            }
        }
        else {
            console.log('more email available');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        res.redirect('back')
    }
}