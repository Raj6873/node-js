const express = require('express');

const route = express.Router();

const empctr = require('../controllers/empcontrollers');

route.get('/', empctr.empPage);

route.post('/addEMP', empctr.insertEMP);

module.exports = route;