const express = require('express');
const { viewExSubCategoryPage, addExSubCategoryPage, insertExSubCategory, deleteExSubCategory, editExSubCategory, changeStatus } = require('../controllers/exSubCategoryController');

const route = express.Router();

route.get('/', viewExSubCategoryPage);
route.get('/addexsubcategorypage', addExSubCategoryPage);
route.post('/insertexsubcategory', insertExSubCategory);
route.get('/deleteexsubcategory', deleteExSubCategory);
route.get('/editexsubcategory', editExSubCategory);
route.get('/changestatus', changeStatus);

module.exports = route;