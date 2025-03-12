const  express = require('express')
const db =require("./config/db")
const student =require("./models/student")

const app = express()
const port = 7000

app.set('view engine','ejs')
app.use(express.urlencoded()); 

app.get("/",(req,res)=>{
        res.render("home");
})
app.post('/addstudent', (req, res) => {
        console.log(req.body);
    
        // const { name, age, course,email } = req.body;
    
        student.create(req.body).then(() => {
            console.log("Data inserted...");
        }).catch((err) => {
            console.log("Error ", err);
        })
    
        res.redirect('/');
    })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))