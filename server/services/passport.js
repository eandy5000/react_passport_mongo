const passport = require('passport')
const User = require('../models/user')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../config')
const LocalStrategy = require('passport-local')

//local Strategy
const localOptions = {usernameField: 'email'}
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    User.findOne({ email }, function(err, user){
        if(err) {return done(err)}
        if(!user){return done(null, false)}
        //found a user, check password
        user.comparePassword(password, function(err, isMatch){
            if(err) {return done(err)}
            if(!isMatch) {return done(null, false)}
            if(isMatch) {return done(null, user)}
        })
    })
})

//jwt Strategy

//option
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

//create Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    //in the callback we want to see if user id from the payload is in mongo
    User.findById(payload.sub, function(err, user){
        if(err){return done(err, false)}
        if(user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
})

//tell passport to use Strategy
passport.use(jwtLogin)
passport.use(localLogin)