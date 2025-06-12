const excategoryModel = require('../models/excategorymodel');
const categoryModel = require('../models/categorymodel');
const subcategoryModel = require('../models/subcatemodel');
const productModel = require('../models/productModel');

const extable = async (req, res) => {
    try {
        const record = await excategoryModel.find({}).populate('categoryId').populate('subcategoryId')
        return res.render('excategory/extable', {
            record
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const exform = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        const subcategory = await subcategoryModel.find({});
        return res.render('excategory/exform', {
            category,
            subcategory
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const exaddcategory = async (req, res) => {
    try {
        let excategoryuser = await excategoryModel.create({
            categoryId: req.body.category,
            subcategoryId: req.body.subcategory,
            excategory: req.body.excategory
        })
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteexrecord = async (req, res) => {
    try {
        let deletexrecord = await excategoryModel.findByIdAndDelete(req.query.delid);
        let productrecord = await productModel.deleteMany({ excategoryId: req.query.delid });
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editexRecord = async (req, res) => {
    try {
        let category = await categoryModel.find({});
        let subcategory = await subcategoryModel.find({});
        let editRecord = await excategoryModel.findById(req.query.editId).populate('categoryId').populate('subcategoryId');
        return res.render('excategory/exedit', {
            single: editRecord,
            category,
            subcategory
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateExcategory = async (req, res) => {
    try {
        let excategory = await excategoryModel.findByIdAndUpdate(req.body.editid, {
            categoryId: req.body.category,
            subcategoryId: req.body.subcategory,
            excategory: req.body.excategory,
        })
        return res.redirect('/extable');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const categoryInstock = async (req, res) => {
    try {
        let catstatus = await excategoryModel.findByIdAndUpdate(req.query.id, {
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
        let catstatus = await excategoryModel.findByIdAndUpdate(req.query.id, {
            status: 1
        })
        req.flash('success', "category status updated!");
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = ({
    extable, exform, exaddcategory, deleteexrecord, editexRecord, updateExcategory, categoryInstock, categoryOutstock
})