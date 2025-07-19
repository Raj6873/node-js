const productModel = require('../models/productModel');
const categoryModel = require('../models/categorymodel');
const subcategoryModel = require('../models/subcatemodel');
const excategoryModel = require('../models/excategorymodel');

const fs = require('fs')

const formproduct = async (req, res) => {
    try {
        let category = await categoryModel.find({});
        let subcategory = await subcategoryModel.find({});
        let excategoroy = await excategoryModel.find({});
        return res.render('product/formproduct', {
            category, subcategory, excategoroy
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const tableproduct = async (req, res) => {
    try {
        let record = await productModel.find({}).populate('categoryId').populate('subcategoryId').populate('excategoryId');
        return res.render('product/tableproduct', {
            record
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const productadd = async (req, res) => {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    try {
        if (req.file) {
            let addRecord = await productModel.create({
                categoryId: req.body.category,
                subcategoryId: req.body.subcategory,
                excategoryId: req.body.excategory,
                title: req.body.title,
                price: req.body.price,
                qty: req.body.qty,
                description: req.body.description,
                image: req.file.path
            });
            return res.redirect('/tableproduct');
        } else {
            return res.status(400).send("Image is required.");
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send("Server Error");
    }
}

const deleteproductrecord = async (req, res) => {
    try {

        let old = await productModel.findById(req.query.delid);
        fs.unlinkSync(old.image);
        
        let deleteRecord = await productModel.findByIdAndDelete(req.query.delid);
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editpeoductRecord = async (req, res) => {
    try {
        let category = await categoryModel.find({});
        let subcategory = await subcategoryModel.find({});
        let excategory = await excategoryModel.find({});
        let product = await productModel.findById(req.query.editId).populate('categoryId').populate('subcategoryId').populate('excategoryId');
        return res.render('product/editpeoduct', {
            single: product, category, subcategory, excategory
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateproduct = async (req, res) => {
    if (req.file) {
        try {
            let update_product = await productModel.findByIdAndUpdate(req.body.editid, {
                categoryId: req.body.category,
                subcategoryId: req.body.subcategory,
                excategoryId: req.body.excategory,
                title: req.body.title,
                price: req.body.price,
                qty: req.body.qty,
                description: req.body.description,
                image: req.file.path
            })
            return res.redirect('/tableproduct');
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    else {
        try {
            let editData = await productModel.findById(req.body.editid)
            let update_product = await productModel.findByIdAndUpdate(req.body.editid, {
                categoryId: req.body.category,
                subcategoryId: req.body.subcategory,
                excategoryId: req.body.excategory,
                title: req.body.title,
                price: req.body.price,
                qty: req.body.qty,
                description: req.body.description,
                image: editData.image
            })
            return res.redirect('/tableproduct');
        } catch (error) {
            console.log(error);
            return false;
        }
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
    formproduct, tableproduct, productadd, deleteproductrecord, editpeoductRecord, updateproduct, categoryOutstock, categoryInstock
})