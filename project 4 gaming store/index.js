const  express = require('express')
const db =require('./config/db');

const app = express()
const port = 2580

app.set("view engine",'ejs')

app.get('/', (req, res) =>{
    res.render('home')
})

app.listen(port, (err)=>{
    if(err){
        console.log("err")
        return false;
    }
    console.log("server is stated...?",port)
})