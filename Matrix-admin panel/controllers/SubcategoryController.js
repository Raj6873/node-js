const CategoryModel = require('../models/CategoryModel')
const SubCategoryModel = require('../models/SubcategoryModel')

const addsubCategorypage = async (req, res) => {
    try {
        let categories = await CategoryModel.find({ status: 'active' });
        return res.render('subcategory/add_subcategory', {
            category: categories
        })

    } catch (err) {
        console.log(err);
        return false;

    }
}

const viewsubCategorypage = async (req, res) => {
    try {
        const subcategory = await SubCategoryModel.find({}).populate('categoryId');
        return res.render('subcategory/view_subcategory', {
            subcategory: subcategory
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const insertSubcategory = async (req, res) => {
    try {
        const { category, subcategory } = req.body;
        await SubCategoryModel.create({
            categoryId: category,
            subcategory: subcategory
        })
        req.flash('success', "subcategory successfully create");
        return res.redirect('/subcategory/addsubcategorypage')
    } catch (err) {
        console.log(err);
        return false;
    }
}
const editSubcategory = async (req, res) => {
    try {
        const id = req.query.id;
        let category = await CategoryModel.find({ status: 'active' });
        let single = await SubCategoryModel.findById(id).populate('categoryId');
        return res.render('subcategory/edit_subcategory', {
            single: single,
            category: category
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    addsubCategorypage, viewsubCategorypage, insertSubcategory, editSubcategory
}