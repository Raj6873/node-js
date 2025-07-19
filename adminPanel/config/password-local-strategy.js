const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const adminmodel = require("../model/adminModel")

passport.use(new localstrategy({
    usernameField: 'email',
},
    async function (email, password, done) {
        let adminData = await adminmodel.findOne({
            email: email
        })
        if (adminData) {
            if (adminData.password == password) {
                return done(null, adminData)
            }
            else {
                return done(null, false)
            }
        } else {
            return done(null, false)
        };
    }))
passport.serializeUser(function (user, done) {
    return done(null, user.id)
})
passport.deserializeUser(async function (id, done) {
    let adminRecord = await adminmodel.findById(id)
    if (adminRecord) {
        return done(null, adminRecord)
    } else {
        return done(null, false)
    }
})
module.exports = passport