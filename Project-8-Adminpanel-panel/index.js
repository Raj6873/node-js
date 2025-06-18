const express = require('express');

const port = 8060;

const app = express();

const db = require('./config/db');
const flash = require('connect-flash');

app.set('view engine', 'ejs');

const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const cookieparser = require('cookie-parser');

const passport = require('passport');
const passportLocal = require('./config/passportstratagy');
const session = require('express-session');

app.use(session({
    secret: 'raj@rnw',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1600 * 60 * 60 * 24
    }
}))

app.use(flash());

//connect flash
app.use(function (req, res, next) {
    res.locals.message = req.flash();
    next();
});

app.use(cookieparser());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setuser);

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/indexroutes'));

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`server is start on port:- ${port}`);
})