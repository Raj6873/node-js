const { name } = require('ejs');
const express = require('express')
const app = express();
const fs = require("fs")
const port = 9000

app.set("view engine", "ejs")
app.use(express.urlencoded());

let studentdata = [
    {
        name: "jay",
        email: "jay@gmail.com",
        age: 20,
        password: "12345",
        number: "1326536253"
    },
    {
        name: "harsh",
        age: 18,
        email: "harsh@gmail.com",
        password: "harsh@123",
        number: "7861821691"
    },
    {
        name: "vaibhv",
        age: 25,
        email: "vaibhv@gmail.com",
        password: 12345,
        number: "1326536253"
    }
]

app.get("/", (req, res) => {
    res.render("index", {
        studentdata
    })
})
app.get("/insertdata", (req, res) => {
    res.render("form")
})

app.post("/studentdata", (req, res) => {
    console.log("req for data", req.body);

    const obj = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
    }
    studentdata.push(obj);
    res.redirect("/")
})
app.get("/edit", (req, res) => {

    const id = req.query.id; //1 

    const data = studentdata.find((val, i) => id == i); 

    data.id = req.query.id;

    console.log(data);

    res.render("edit", { data });  
})

app.post("/updateStudent", (req, res) => {
    const { id, name, age, email, phone, password } = req.body;

    console.log(req.body);

    studentdata = studentdata.map((val, i) => {
        if (i == id) {
            val.name = name;
            val.age = age;
            val.email = email;
            val.phone = phone;
            val.password = password;
        }
        return val;
    })

    res.redirect("/");
})


app.get("/delete", (req, res) =>{

    console.log(req.query.id); 

    studentdata = studentdata.filter((val, index) => index != req.query.id);


    res.redirect("/");

})

app.listen(port, () => console.log(`server is starte.....? ${port}!`));