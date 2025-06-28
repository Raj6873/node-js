const express = require ("express");
const db = require ("./config/db");

const app =express()
const port =2500;



app.listen(port,(err)=>{
    if(err){
        console.log("server is not conected...?",err);
        return false;
    }
    console.log("server is conected  successfully...?")
});