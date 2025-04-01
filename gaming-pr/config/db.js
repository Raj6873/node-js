const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/jay';

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Database Connected Successfully'))
.catch(err => console.log('❌ Database Connection Error:', err));

module.exports = mongoose;
