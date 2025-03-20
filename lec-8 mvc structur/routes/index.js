const express = require('express')

const route = express.Router();

console.log("routing is strated");

const postcnt = require('../controllers/postcontroller');

route.get('/', postcnt.homepage);

route.get('/', postcnt.aboutpage);

module.exports = route;