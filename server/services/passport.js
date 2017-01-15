const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const localStrategy = require('passport-local')

//local strategy
const localOptions = { usernameField: 'email' }
const localLogin = new localStrategy(localOptions, function(email, password, done){
    //verify email and password call done with user
    //else call done with false
    User.findOne({email: email}, function(err, user){
        if(err) {return done(err)}
        if(!user) {return done(null, false)}
       // compare password is 'password' equal to user.password
       user.comparePassword(password, function(err, isMatch){
           if(err) {return done(err)}
           if(!isMatch) {return done(null, false)}

           return done(null, user)
       })
    })
})

//options for jwt Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

//set up jwt Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
//payload has sub and iat and done is a callback that determines if the strategy worked

//goal see if user exists in database if it does call done with user
//otherwise call done without user
    User.findById(payload.sub, function(err, user){
        if (err) {return done(err, false)}
        if(user) {
            return done(null, user)
        } else {
            return done(null, false)
        }

    })

})

//tell passport to use this Strategy
passport.use(jwtLogin)
passport.use(localLogin)



