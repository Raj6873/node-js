const studentModel = require('../models/studentModel')
const bcrypt = require('bcrypt')
const moment = require('moment');

console.log("student controoler..?")

const addstudent = async (req, res) => {

    try {
        const insertdatastudent = await studentModel.create(req.body);

        if (insertdatastudent) {
            res.status(201).json({ msg: "student data insert succussfully...?" })
        } else {
            res.status(201).json({ msg: "student data insert faild...?" })
        }
    } catch (e) {
        res.status(400).json({ msg: "Something Went Wrong...", error: e });
    }

}


module.exports = {
    addstudent,
}