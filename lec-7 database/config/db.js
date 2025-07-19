const mongoose = require("mongoose")

const mongoouri = 'mongodb://localhost:27017/scholl'
mongoose.connect(mongoouri)

const db = mongoose.connection;

db.on('connected',()=> console.log("data base is connected "));
db.on('error',(err)=> console.log("data base is not connected",err));
db.on('disconnected',()=> console.log("data base is disconnected",err));

module.exports =db;