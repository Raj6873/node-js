const express = require('express');
const port = 2560
const app = express();
const path = require('path');
const db = require('./config/mongoose')
const Cookie = require('cookie-parser')

app.use(express.urlencoded())
app.use(Cookie());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')))
app.use('/uplodes',express.static(path.join(__dirname, 'uplodes')))
app.use('/',require('./routes/AdminRoutes'))

app.listen(port, (err) => {
    err?console.log(err): console.log("server is listening on port : " + port)

})