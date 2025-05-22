const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const ImagePath = '/uplodes/AdminImage'

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobby: {
        type: Array,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    Message : {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const storeImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", ImagePath))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now())
    }
})

AdminSchema.statics.uplodeAdminImage = multer({ storage: storeImage }).single('image');
AdminSchema.statics.imagePath = ImagePath;

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
