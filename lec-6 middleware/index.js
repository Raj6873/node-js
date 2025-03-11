const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const fs = require('fs');


app.set('view engine','ejs')


const middleware = (req, res, next) => {
    console.log("Middleware 1");

    console.log("Age", req.query.age);
    next();

}


app.use(middleware);
app.use((req, res, next) => {
    console.log("Middleware 2");
    console.log("Name ", req.myName);
    next()
})

app.use('/', express.static('public'));


app.get("/",(req,res)=>{
        res.render('home');
})
   
app.get('/users', (req, res) => {
    res.render('users');
})

app.get("/charts",(req,res)=>{
    res.render('charts');
})

app.listen(port, () => console.log(`server is starte.....? ${port}!`));

