const categoryModel = require('../model/categoryModel');
const subcategoryModel = require('../model/subCategoryModel');
const exsubcategoryModel = require('../model/exSubCategoryModel');

const viewExSubCategoryPage = async (req, res) => {
    try {
        let exsubcategory = await exsubcategoryModel.find({}).populate('categoryId').populate('subcategoryId');

        return res.render('exsubcategory/view_exsubcategory', {
            exsubcategory: exsubcategory
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const addExSubCategoryPage = async (req, res) => {
    try {
        let category = await categoryModel.find({ status: "active" });
        let subcategory = await subcategoryModel.find({ status: "active" });

        return res.render('exsubcategory/add_exsubcategory', {
            category: category,
            subcategory: subcategory
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const insertExSubCategory = async (req, res) => {
    try {
        const { editid, category, subcategory, exsubcategory } = req.body;

        if (editid) {
            await exsubcategoryModel.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exSubCategory: exsubcategory
            })
            req.flash('success', 'Exsubcategory successfully updated');
            return res.redirect('/exsubcategory')
        }
        else {
            await exsubcategoryModel.create({
                categoryId: category,
                subcategoryId: subcategory,
                exSubCategory: exsubcategory
            })
            req.flash('success', 'Exsubcategory successfully create');
            return res.redirect('/exsubcategory/addexsubcategorypage')
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteExSubCategory = async (req, res) => {
    try {

        const id = req.query?.did;
        await exsubcategoryModel.findByIdAndDelete(id);
        req.flash('success', 'Exsubcategory successfully deleted');
        return res.redirect('/exsubcategory/');

    } catch (err) {
        console.log(err);
        return false;
    }
}

const editExSubCategory = async (req, res) => {
    try {
        let id = req.query?.eid;
        let category = await categoryModel.find({ status: 'active' })
        let subcategory = await subcategoryModel.find({ status: 'active' });

        let single = await exsubcategoryModel.findById(id).populate('categoryId').populate('subcategoryId');

        return res.render('exsubcategory/edit_exsubcategory', {
            category: category,
            subcategory: subcategory,
            single
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const changeStatus = async(req,res) => {
    try {
        const { id, status } = req.query;
        if (status == "deactive") {
            await exsubcategoryModel.findByIdAndUpdate(id, {
                status: status
            })
            req.flash("success", "Subcategory successfully update")
            return res.redirect('/exsubcategory')
        } else {
            await exsubcategoryModel.findByIdAndUpdate(id, {
                status: status
            })
            req.flash("success", "Subcategory successfully update")
            return res.redirect('/exsubcategory')
        }
    } catch (error) {
        console.log(error);
        return false;        
    }
}
module.exports = {
    viewExSubCategoryPage,
    addExSubCategoryPage,
    insertExSubCategory,
    deleteExSubCategory,
    editExSubCategory,
    changeStatus
}