const express = require('express');
const { addSubcategoryPage, viewSubCategoryPage, insertSubCategory, deleteSubCategory, editSubCategory, changeStatus } = require('../controllers/subCategoryController');

const route = express.Router();

route.get('/', viewSubCategoryPage);
route.get('/addSubCategoryPage', addSubcategoryPage);
route.post('/insertsubcategory', insertSubCategory);
route.get('/deletesubcategory', deleteSubCategory);
route.get('/editsubcategory', editSubCategory);
route.get('/changestatus', changeStatus);

module.exports = route;