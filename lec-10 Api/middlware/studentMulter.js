const multer = require('multer');

console.log("multer is stated...?")

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/studentupload")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.orignalname)
    }
});

const upload = multer({
    Storage: Storage,
})

module.exports = upload;