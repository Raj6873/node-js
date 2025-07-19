const express = require('express');
const port = 2580;
const path = require('path')
const app = express();
const db = require('./config/db')
const session = require('express-session');
const passport = require('passport');
const localstrategy = require('./config/password-local-strategy');

app.use(session({
    name: "hardik",
    secret: 'hardikey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'assets')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/', require('./routes/adminRoute'))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("server is Running on port ", +port);
    }
})