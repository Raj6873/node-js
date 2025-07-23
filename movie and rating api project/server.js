const  express = require('express')

require("dotenv").config()
const db = require("./config/database")

const app = express()

app.use(express.urlencoded({extended : true}));

app.use("/admin",require("./routes/adminRoute"))
app.listen(process.env.PORT,(err)  =>{
    if(err){
        console.log("server is not connected....?")
        return false;
    }
    console.log("server is stataed....?",process.env.PORT)
})