const categoryModel = require('../model/categoryModel');

const addCategoryPage = (req, res) => {
    return res.render('category/add_category');
}

const viewCategoryPage = async (req, res) => {
    try {
        let categories = await categoryModel.find({}); //query for view category
        return res.render('category/view_category',
            { categories : categories } //key
        )
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


const insertCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        await categoryModel.create({
            category /* key for storing value */: categoryName //key from add page
        })
        req.flash('success', 'category add successfully')
        return res.redirect('/category/addcategoryPage');

    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteCategory = async (req, res) => {
    try {
        let id = req.query?.id;
        await categoryModel.findByIdAndDelete(id);
        req.flash('success', 'category delete successfully');
        return res.redirect('/category');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const editCategory = async (req, res) => {
    try {
        let id = req.query?.id;
        let single = await categoryModel.findById(id);
        return res.render('category/edit_category', {
            single: single
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateCategory = async (req, res) => {
    try {
        const { editid, category } = req.body;
        await categoryModel.findByIdAndUpdate(editid, {
            category: category
        })

        req.flash('success', 'category update successfully');
        return res.redirect('/category');

    } catch (err) {
        console.log(err);
        return false;
    }

}
const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.query;
        if (status == "deactive") {
            await categoryModel.findByIdAndUpdate(id, {
                status: status
            })
            req.flash("success", "Category successfully update")
            return res.redirect('/category')
        } else {
            await categoryModel.findByIdAndUpdate(id, {
                status: status
            })
            req.flash("success", "Category successfully update")
            return res.redirect('/category')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = {
    addCategoryPage,
    viewCategoryPage,
    insertCategory,
    deleteCategory,
    editCategory,
    updateCategory,
    changeStatus
}