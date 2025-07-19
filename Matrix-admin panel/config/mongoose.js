const mongoose  = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/AdminPanel')

const db = mongoose.connection;
db.once('open',(err)=>{
    if(err) throw err;
    console.log('MongoDB connected...');
})