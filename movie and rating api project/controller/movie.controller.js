const adminModel = require("../models/movie.Model");
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const moment = require("moment");

// AdminRegister
const addmovie = async (req, res) => {
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
}


module.exports = {
    addmovie,
}