const adminModel = require("../models/adminModel");       
const bcrypt = require("bcrypt")
const moment = require("moment")  

const Adminregister =async (req,res)=>{
    try{

    }catch(e){
        res.status(400).json({msg : "somthine went wrong",error:e});

    }
}

module.exports={
    Adminregister
}