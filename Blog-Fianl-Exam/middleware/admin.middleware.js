const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});
module.exports= multer({storage:storage});