const mongoose = require('mongoose');

const URI ="mongodb://localhost:27017/API-user-data";

mongoose.connect(URI)
const db = mongoose.connection;

db.on("connected",(err)=>{
    console.log("db is connected...?");
});

db.on("error",(err)=>{
    console.log("error",err);
});

db.on("Disconnected",(err)=>{
    console.log("db is Disconnected....?");
});

module.exports =db;