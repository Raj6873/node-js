const categorymodel = require('../models/categorymodel');
const subcategorymodel = require('../models/subcatemodel');
const excategoryModel = require('../models/excategorymodel');
const productModel = require('../models/productModel');

const tablecategery = async (req, res) => {
    try {
        let category = await categorymodel.find({});
        return res.render('categorys/tablecategery', {
            record: category,
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const formcategory = (req, res) => {
    return res.render('categorys/formcategory');
}

const Addcategory = async (req, res) => {
    try {
        let user = await categorymodel.create({
            category: req.body.category,
        })
        return res.redirect('tablecategery');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleterecord = async (req, res) => {
    try {
        let delId = await categorymodel.findById(req.query.delid);
        if (!delId) {
            console.log("delete not feach");
            return res.redirect('back');
        }
        let deleid = await categorymodel.findByIdAndDelete(req.query.delid);
        let alldelRecord = await subcategorymodel.deleteMany({ categoryId: req.query.delid });
        let exdeletrecord = await excategoryModel.deleteMany({ categoryId: req.query.delid });
        let productrecord = await productModel.deleteMany({ categoryId: req.query.delid });
        console.log(alldelRecord);
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editRecord = async (req, res) => {
    try {
        let edituser = await categorymodel.findById(req.query.editId);
        return res.render('categorys/edit', {
            single: edituser
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updatecategory = async (req, res) => {
    try {
        let upadteUser = await categorymodel.findByIdAndUpdate(req.body.editid, {
            category: req.body.category
        })
        return res.redirect('/tablecategery');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const categoryInstock = async (req, res) => {
    try {
        let catstatus = await categorymodel.findByIdAndUpdate(req.query.id, {
            status: 0
        })
        req.flash('success', "category status updated!")
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const categoryOutstock = async (req, res) => {
    try {
        let catstatus = await categorymodel.findByIdAndUpdate(req.query.id, {
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
    tablecategery, formcategory, Addcategory, deleterecord, editRecord, updatecategory, categoryInstock, categoryOutstock
})