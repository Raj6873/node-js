const express = require('express');
const route = express.Router();
const {
    allArticles, createArticle, updateArticle, deleteArticle
} = require('../controllers/movie.controller');
const authentication = require('../middleware/auth.middleware');
const uploads = require('../middleware/movie.multer');

route.get('/', allArticles);
route.post('/create', authentication, uploads.single('image'), createArticle);
route.delete('/delete/:id', authentication, deleteArticle);

module.exports = route;