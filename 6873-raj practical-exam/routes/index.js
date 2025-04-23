const express = require('express');
const Controller = require('../controllers/InventoryCntroller');
const routes = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


console.log('routing.');

routes.get('/', Controller.HomePage);

routes.get('/formPage' ,Controller.ProductForm);

routes.post('/InventoryProduct', upload.single('InventoryImage'), Controller.InventoryProduct);



module.exports = routes;