const multer = require('multer');

console.log("multer is stated...?")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/studentupload")
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage:storage
})

module.exports = upload;