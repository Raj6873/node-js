const mongoose = require('mongoose');

const exSubCategorySchema = mongoose.Schema({
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
    subcategoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
    },
    exSubCategory:{
        type : String,
        required: true
    },
    status:{
        type: String,
        default: 'active'
    }
});

const exSubCategory = mongoose.model('exSubCategory', exSubCategorySchema);
module.exports = exSubCategory;