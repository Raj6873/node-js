const express = require('express');
const multer = require('multer');
const route = express.Router();
const controllers = require('../controllers/gaminigcontroller');

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
route.post('/insert', upload.single('game_image'), controllers.insertgame);
route.get('/delete/:id', controllers.Deletegame)
route.post('/edit/:id',upload.single('game_image'), controllers.Editgame);
route.get('/update/:id', controllers.Updategame)

module.exports = route;
