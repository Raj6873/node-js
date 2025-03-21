const express = require('express')
const db = require('./config/db')

const app = express()
const port = 2580

app.set('view engine', 'ejs');

app.use('/', require('./routes'))

app.listen(port, (err) => {
    if (err) {
        console.log("error");
        return false;
    }
    console.log("server is run:ing", port);
})