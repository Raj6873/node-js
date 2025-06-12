const mongoose = require('mongoose');

const exsubcategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    excategory: {
        type: 'String',
        require: 'true'
    },
    status: {
        type: Number,
        default: 1
    }
})

const tblName = mongoose.model('exsubcategory', exsubcategorySchema);

module.exports = tblName;