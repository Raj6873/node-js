const categoryModel = require('../models/categorymodel');
const subcategoryModel = require('../models/subcatemodel');
const excategoryModel = require('../models/excategorymodel');
const productModel = require('../models/productModel');

const tablesub = async (req, res) => {
    try {
        let subcategory = await subcategoryModel.find({}).populate('categoryId');
        return res.render('subcategory/tablesub', {
            subcategory
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const formsub = async (req, res) => {
    try {
        let category = await categoryModel.find({});

        return res.render('subcategory/formsub', {
            category
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const Addsubcategory = async (req, res) => {
    try {
        let subcategoryrecord = await subcategoryModel.create({
            categoryId: req.body.category,
            subcategory: req.body.subcategory,
        })
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deletesubrecord = async (req, res) => {
    try {
        const subcategorydelete = await subcategoryModel.findByIdAndDelete(req.query.delid);
        const excategorydelete = await excategoryModel.deleteMany({ sucategoryId: req.query.delid });
        const productdelete = await productModel.deleteMany({ sucategoryId: req.query.delid });
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editsubRecord = async (req, res) => {
    try {
        let category = await categoryModel.find({});
        let edituser = await subcategoryModel.findById(req.query.editId).populate('categoryId');
        return res.render('subcategory/edit', {
            category,
            single: edituser
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const Editsubcategory = async (req, res) => {
    try {
        let edituser = await subcategoryModel.findByIdAndUpdate(req.body.editid, {
            categoryId: req.body.category,
            subcategory: req.body.subcategory
        });
        return res.redirect('/tablesub');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const categoryInstock = async (req, res) => {
    try {
        let catstatus = await categoryModel.findByIdAndUpdate(req.query.id, {
            status: 0
        })
        req.flash('success', "category status updated!");
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const categoryOutstock = async (req, res) => {
    try {
        let catstatus = await categoryModel.findByIdAndUpdate(req.query.id, {
            status: 1
        })
        req.flash('success', "category status updated!")
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = ({
    tablesub, formsub, Addsubcategory, deletesubrecord, editsubRecord, Editsubcategory, categoryInstock, categoryOutstock
})