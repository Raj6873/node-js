const mongoose = require('mongoose');
const mongoUrl = ('mongodb://localhost:27017/gaminig-crud');
const db=mongoose.connection;
mongoose.connect(mongoUrl);
db.on('connected', () => console.log('DataBase is Connected..'));
db.on('error', (err) => console.log('DB is  not Connected..', err));
db.on('disconnected', () => console.log('DB is Disconnected..'));
module.exports = db;
