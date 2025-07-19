const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        require: true,
    },
    status: {
        type: Number,
        default: 1
    }
})

const tblName = mongoose.model('category', categorySchema);

module.exports = tblName;