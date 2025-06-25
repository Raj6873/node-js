const express = require ("express");

const app =express()
const port =2500;

app.use("/",require("./routes/AdminRote"))
app.use("/employe",require("./routes/employeRote"))
app.use("/manger",require("./routes/mangerRoute"))

app.listen(port,(err)=>{
    if(err){
        console.log("server is not conected...?",err);
        return false;
    }
    console.log("server is conected  successfully...?")
});