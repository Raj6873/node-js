// const { log } = require('console')
const  express = require('express');
const app = express()
const port = 2580

app.set('view engine ' ,'ejs');

app.get('/',(req,res)=>{
    res.render('dashboard')
})

app.listen(port, (err)=>{
    if(err){
        console.log("server is not stated...?");
    }
    console.log("server is stated...?",port)
});