const express = require('express');
const db = require('./config/db');
const multer =require('multer'); 
const app = express();
const path = require('path');
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.use('/',require('./routes/InventoryRotes'));

app.listen(port, (err) => {
    if (err) {
        console.log("Server is not started...", err);
        return;
    }
    console.log(`Server is started on port ${port}`);
});
