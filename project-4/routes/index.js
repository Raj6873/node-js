const express = require('express');
const multer = require('multer');
const route = express.Router();
const controllers = require('../controllers/musiccontroller');

const storage = multer.diskStorage({
    destination : (req, file,cb) => {
        cb(null, "uploads/");
    },
    filename : (req, file, cb) => {
        cb(null, Date.now()+file.originalname)
    }
});
 
const upload = multer({storage: storage});

console.log("Routing...");

route.get('/', controllers.homepage);
route.get('/form', controllers.RenderForm);
route.post('/insert', upload.single('album_cover'), controllers.insertalbum);
route.get('/delete/:id', controllers.DeleteAlbum)
route.post('/edit/:id',upload.single('album_cover'), controllers.EditAlbum);
route.get('/update/:id', controllers.UpdateAlbum)

module.exports = route;
