const express = require('express');
const port = 2580;
const app = express();
const db = require('./config/db');
app.set('view engine', 'ejs');
const path = require('path');
app.use('/', express.static(path.join(__dirname, 'public')))
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded());

//login system
const passport = require('passport');
const passportLocal = require('./config/passportLocal');
const session = require('express-session');
app.use(session({
    name: 'admin-penal',
    secret: 'admin-penal',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser)

//flash message start
const flash = require('connect-flash');
app.use(flash());
app.use('/', (req, res, next) => {
    res.locals.message = req.flash();
    return next();
})
//flash message end

app.use('/', require('./routes/indexRoute'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})