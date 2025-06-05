const express = require('express');
const routes = express.Router();
const { addsubCategorypage, viewsubCategorypage, insertSubcategory, editSubcategory } = require('../controller/SubcategoryController');

routes.get('/', viewsubCategorypage)
routes.get('/addsubcategorypage', addsubCategorypage);
routes.post('/insertsubcategory', insertSubcategory);
routes.get('/editsubcategory', editSubcategory)

module.exports = routes;