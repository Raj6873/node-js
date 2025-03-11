const express = require('express');
const port = 9000;
const app = express();
const path = require("path");
const todoDatabase = []; 
const todoDone = []; 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.urlencoded());

app.post("/todoData",(req, res) => {
    console.log(req.body);
    todoDatabase.push(req.body);
    res.redirect("/");
})

app.get("/delete",(req, res) => {
    todoDatabase.splice(req.query.id,1);
    res.redirect("/");
})

app.get("/update",(req, res)=>{
    console.log(req.query.id);

    todoDone.push(todoDatabase[req.query.id]);
    todoDatabase.splice(req.query.id,1);
    res.redirect("/");
})
app.get("/",(req,res)=>{
    res.render("home",{
        todoDatabase,
        todoDone
    });
})
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server is listening on port " + port);
})