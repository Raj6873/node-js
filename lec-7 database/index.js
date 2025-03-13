const express = require('express')
const db = require("./config/db")
const student = require("./models/student")

const app = express()
const port = 7000

app.set('view engine', 'ejs')
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.render("home");
})
app.post('/addstudent', (req, res) => {
    console.log(req.body);

    student.create(req.body).then(() => {
        console.log("Data inserted...");
    }).catch((err) => {
        console.log("Error ", err);
    })

    res.redirect('/');
})
app.get('/fetch', (req, res) => {
    student.find({}).then((recoder) => {
        console.log("data is sucesfully");
        res.render('fetch', { recoder })
        res.end(err)
    }).catch((err) => {
        console.log("error", err)
    })
})
app.get('/delete', (req, res) => {
    console.log(req.query.id); 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))