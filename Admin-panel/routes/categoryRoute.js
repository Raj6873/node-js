const express = require('express');
const { addCategoryPage, viewCategoryPage, insertCategory, deleteCategory, editCategory, updateCategory, changeStatus } = require('../controllers/categoryController');

const routes = express.Router();

routes.get('/addcategoryPage',addCategoryPage);
routes.get('/', viewCategoryPage);
routes.post('/insertCategory', insertCategory);
routes.get('/deleteCategory', deleteCategory);
routes.get('/editcategory', editCategory);
routes.post('/updatecategory', updateCategory);
routes.get('/changestatus', changeStatus);

module.exports = routes;