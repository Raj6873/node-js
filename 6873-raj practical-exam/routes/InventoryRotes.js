const express = require('express');
const multer = require('multer');
const route = express.Router();
const controller = require('../controller/InventoryController')

const storage = multer.diskStorage({
    destination : (req, file,cb) => {
        cb(null, "uploads/");
    },
    filename : (req, file, cb) => {
        cb(null, Date.now()+file.originalname)
    }
});

const upload = multer({storage: storage});

route.get('/', controller.homepage)


console.log("routing is stated");

module.exports = route