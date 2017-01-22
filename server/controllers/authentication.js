const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config').secret

function tokenForUser(user) {
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.id, iat:timestamp }, config)
}

exports.signup = function(req, res, next) {
    const email = req.body.email
    const password = req.body.password

    if(!email || !password) {
        res.json({ "error":"must enter email and password" })
    }

    //email uniquess check
    User.findOne({ email }, function(err, existingUser){
        //if error
        if(err) {return next(err)}
        //if email exists
        if(existingUser) {
            return res.status(422)
                      .json({"error": "email already exists"}) 
        }
        const user = new User({ email, password})
        console.log(user, user.id)
        user.save(function(err){
            if(err){return next(err)}
            res.json({ token: tokenForUser(user)})
        })
    })

}