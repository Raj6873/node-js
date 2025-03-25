
const express = require('express');

const route = express.Router();

console.log("Routing");
const postController = require('../controllers/postcontrollers');


route.get('/', postController.postPage);
route.get('/about', postController.aboutPage);
route.get('/contact', postController.contactPage);
route.get('/home', postController.homePage);

route.use('/employee', require('./employee'));

module.exports = route;

