const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('./config/db');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use("/", require("./routes/index.js"));

app.listen(process.env.PORT, (e) => {
  console.log(' Server is running on port 3000 😎');
});