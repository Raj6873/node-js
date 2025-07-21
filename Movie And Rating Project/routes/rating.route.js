const express = require('express');
const route = express.Router();
const {
    allArticles, createArticle, updateArticle, deleteArticle
} = require('../controllers/rating.controller');
const authentication = require('../middleware/auth.middleware');

route.get('/', allArticles);
route.post('/create', authentication, uploads.single('image'), createArticle);
route.delete('/delete/:id', authentication, deleteArticle);

module.exports = route;