const express = require('express');
const db = require('./config/db');
const multer = require("multer");
const app = express();
const path = require('path');
const port = 2580;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/images', express.static(path.join(__dirname , 'images')));
app.use('/fonts', express.static(path.join(__dirname , 'fonts')));
app.use('/uploads', express.static(__dirname+"/uploads"));

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log("Server is not started...", err);
        return false;
    } 
    console.log("Server is started..");
});  