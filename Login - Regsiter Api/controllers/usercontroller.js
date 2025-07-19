const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const ScretKey = "raj123@rnw";


// registerUserdata
const registerUserdata = async (req, res) => {
    try {
        const exitsData = await userModel.findOne({ username: req.body.username });

        if (exitsData == null) {
            const exitsEmail = await userModel.findOne({ email: req.body.email });

            if (exitsEmail == null) {
                req.body.password = await bcrypt.hash(req.body.password, 7);
                const registerData = await userModel.create(req.body);
                if (registerData) {
                    res.status(201).json({ message: "user register successfully" })
                } else {
                    res.status(201).json({ message: "user is not register" })
                }
            }
            else {
                res.status(201).json({ message: "email alredy extis " })
            }
        } else {
            res.status(201).json({ message: "username alredy extis" })
        }
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong", error: error })
    }
}

// login user
const loginUserdata = async (req, res) => {
    try {
        const userData = await userModel.findOne({ email: req.body.email });
        if (userData) {
            if (await bcrypt.compare(req.body.password, userData.password)) {
                const token = JWT.sign({ userData }, ScretKey);
                res.status(201).json({ message: "user login  successfully", token: token })
            } else {
                res.status(201).json({ message: "password is worng" })
            }
        } else { 
            res.status(201).json({ message: "email is wrong" })
        }
    } catch (error) {
        res.status(400).json({ message: "somthing wrnt wrong", error: error })

    }
}
module.exports = {
    registerUserdata, loginUserdata
}