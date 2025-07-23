const  express = require('express')
const db = require("./config/database")

const app = express()
const port = 2580

app.use(express.urlencoded({extended : true}));

app.use("/admin",require("./routes/adminRoute"))
app.listen(port,(err)  =>{
    if(err){
        console.log("server is not connected....?")
        return false;
    }
    console.log("server is stataed....?",port)
})