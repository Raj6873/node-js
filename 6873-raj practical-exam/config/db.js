const mongoose = require('mongoose');
const  url = 'mongodb://localhost:27017/Inventorymangemnet';
mongoose.connect(url);
const db = mongoose.connection;
db.on('connected', () => {
    console.log('Database connected successfully...');
});
db.on('error', (err) => {
    console.log('Database connection error:', err);
});
db.on('disconnected', () => {
    console.log('Database disconnected...');
});
module.exports = db;