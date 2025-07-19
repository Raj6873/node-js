const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
         email:{
            type:String,
            required:true
        },
         password:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true,
    }
);

module.exports= mongoose.model("Admin",AdminSchema,"Admin")