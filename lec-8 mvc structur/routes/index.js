const express = require('express')

const route = express.Router();

console.log("routing is strated");

const postcnt = require('../controllers/postcontroller');

route.get('/', postcnt.homepage);
route.get('/about', postcnt.aboutpage);
route.get('/blog', postcnt.blogpage);
route.get('/service', postcnt.aboutpage);
route.get('/contect', postcnt.contectpage);

module.exports = route;