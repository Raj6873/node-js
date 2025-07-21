const mongoose = require("mongoose");

mongoose
  .connect(process.env.URL)
  .then((data) => {
    console.log("Database is Connected Successfully...");
  })
  .catch((error) => {
    console.log("Error : ", error);
  });
module.exports = mongoose;