const studentModel = require('../models/studentModel')
const bcrypt = require('bcrypt')
const moment = require('moment');
const fs = require('fs')

// addstudent data
const addstudent = async (req, res) => {

    try {
        // bcrypt.hash(password, salt)
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // Date
        req.body.created_date = moment().format("DD/MM/YYYY, h:mm:ss A");
        req.body.updated_date = moment().format("DD/MM/YYYY, h:mm:ss A");

        req.body.image = req.file.path;

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
// fetchdatastudent data
const fetchdatastudent = async (req, res) => {
    try {
        const studentdata = await studentModel.findOne({});

        if (studentdata) {
            res.status(200).json({ msg: "Students data is inserted succussfully....", records: studentdata });
        }
        else {
            res.status(200).json({ msg: "Students data not found..." });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "Something Went Wrong...", error: e });
    }
}
// fetchSingleStudentdata
const fetchSingleStudentdata = async (req, res) => {
  try {
    const singleStudent = await studentModel.findById(req.params.id);
    if (fetchSingleStudentdata) {
      res.status(200).json(singleStudent);
    } else {
      res.status(200).json({ msg: "Student not found.." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Went Wrong...", error: e });
  }
};
//upadetstudentdata
const upadetdatastudent = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        req.body.updated_date = moment().format("DD/MM/YYYY, h:mm:ss A");

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
      
    if (req.file) {
      const data = await studentModel.findById(req.params.id);

      if (data) {
        fs.unlinkSync(data.image);
        req.body.image = req.file.path;
      }
    }
    const upadetstudentdata= await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (upadetstudentdata) {
      res
        .status(200)
        .json({ update: true, msg: "Studentdata  updated is successfully..." });
    } else {
      res
        .status(200)
        .json({ update: false, msg: "Studentdata is  updated failed..." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Went Wrong...", error: e });
  }
}
// deletedatastudent data
const deletedatastudent = async (req, res) => {
    try {
        const deletestudentdata = await studentModel.findByIdAndDelete(req.params.id);

        if (deletestudentdata) {
            fs.unlinkSync(deletestudentdata.image);

            res.status(200).json({ msg: "Student data deleted successfully." });
        } else {
            res.status(404).json({ msg: "Student not found." });
        }
    } catch (e) {
        res.status(500).json({ msg: "Something went wrong.", error: e.message });
    }
}

module.exports = {
    addstudent,
    fetchdatastudent,
    fetchSingleStudentdata,
    upadetdatastudent,
    deletedatastudent,
}