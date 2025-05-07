const { timeStamp } = require('console')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path');
const imgPath = '/uploads'
const adminScheema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    hobby: {
        type: Array,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const storeImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', imgPath))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '/' + Date.now())
    }
})

adminScheema.statics.uploadImgFile = multer({ storage: storeImage }).single('image');
adminScheema.statics.imagePath = imgPath

const Admin = mongoose.model('Admin', adminScheema)
module.exports = Admin