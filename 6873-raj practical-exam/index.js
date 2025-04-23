const express = require('express');
const db = require('./config/db');
const path = require('path');
const app = express();
const port = 2580;

app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.use('/', require('./routes/index'));
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log("server is Running on port ", +port);
  }
})