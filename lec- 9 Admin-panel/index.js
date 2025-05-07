const express = require('express');

const db = require('./config/db');
const app = express();
const port = 2580;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/adminroute'));

app.listen(port, (err) => {
    if (err) {
        console.log("server is not stated...?");
    }
    console.log("server is stated...?", port)
});