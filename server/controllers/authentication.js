const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config')

function tokenForUser(user){
    const timestamp = new Date().getTime()
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}

exports.signup = function(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    
    if(!email || !password) {
        res.json({error: 'must provide email and password'})
    }

    //see if email users exists
    User.findOne({email: email}, function(err, existingUser){
        if(err) {return next(err)}
        //if it does exist return an error
        if(existingUser) {
            return res.status(422)
                      .send({error: "user already exists"})
        }
        //if it is a new email create a new users
        const user = new User({
            email, password
        })
        user.save(function(err){
            if(err) {return next(err)}
            res.json({token: tokenForUser(user)})
        })
       
             
    })


    //respond to the request
}