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
        // res.end(err)
    }).catch((err) => {
        console.log("error", err)
    })
})

app.get('/delet', (req, res) => {
    const id = req.query.id;
    console.log(id);
    

    student.findByIdAndDelete(id)
        .then(() => {
            console.log("Deleted successfully.");
            res.redirect('/fetch'); 
        })
        .catch((err) => {
            console.log("Error deleting student: ", err);
        });
});
app.get("/edit", (req, res) => {
    const id = req.query.id;

    console.log("Update ID", id);

    student.findById(id).then((record) => {
        console.log(record);
        res.render('edit', { record });
    }).catch((err) => {
        res.redirect('/fetch');
        console.log(err);
    })
})

app.post('/Update', (req, res) => {
    const { id, name, age, course } = req.body;

    student.findByIdAndUpdate(id, {
        name: name,
        age: age,
        course: course,
    }).then(() => {
        console.log("Data is Updated");
        res.redirect('/fetch');
    }).catch((err) => {
        console.log(err);
    });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))