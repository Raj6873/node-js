const passport = require('passport');
const passportLocal = require('passport-local').Strategy;

const adminModel = require('../model/adminModel');

passport.use(new passportLocal({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        let user = await adminModel.findOne({ email: email });

        if (!user || user.password != password) {
            console.log(`Invalid email or password`);
            return done(null, false);
        }
        console.log(user)
        return done(null, user);

    } catch (err) {
        console.log(err);
        return false;
    }
}));

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        let user = adminModel.findById(id);
        return done(null, user);
    } catch (err) {
        console.log(err);
        return false;
    }
});

passport.checkUser = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
};

passport.setUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.users = req.user;
    }
    return next();
};

module.exports = passport;

