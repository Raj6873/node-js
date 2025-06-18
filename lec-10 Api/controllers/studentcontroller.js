const studentModel = require('../models/studentModel')
const bcrypt = require('bcrypt')
const moment = require('moment');
const fs = require('fs')

console.log("student controoler..?")
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
const fetchdatastudent = async (req,res)=>{
    try{
        const studentdata =await studentModel.findOne({});

        if(studentdata){
        res.status(200).json({ msg: "Students data is inserted succussfully....", records : studentdata });
        }
        else{
            res.status(200).json({ msg: "Students data not found..." });
        }   
    }
    catch(e){
         res.status(400).json({ msg: "Something Went Wrong...", error: e });
    }
}

// deletedatastudent data
const deletedatastudent = async (req, res) => {
    try {
        const deletestudent = await studentModel.findByIdAndDelete(req.params.id);
        
        if (deletestudent) {
            if (deletestudent.image && fs.existsSync(deletestudent.image)) {
                fs.unlinkSync(deletestudent.image);
            }

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
    deletedatastudent,
    fetchdatastudent,
}