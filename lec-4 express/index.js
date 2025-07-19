const express = require('express')
const app = express();
const fs =require ("fs")
const port = 8000

app.get("/",(req,res)=>{
    fs.readFile("index.html",(err,result)=>{
        res.end(result);
    })
})
   
app.get("/about",(req,res)=>{
    fs.readFile("about.html",(err,result)=>{
        res.end(result);
    })
})

app.listen(port, () => console.log(`server is starte.....? ${port}!`));