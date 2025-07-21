const express = require("express")

const route = express.Router();

route.use('/adminAuth', require('./adminAuth.route')) 
route.use('/article' , require('./movie.route'))
// route.use('/comment') = require('./comment.route')

module.exports = route;  