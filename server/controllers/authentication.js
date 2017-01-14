const User = require('../models/user')

exports.signup = function(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    console.log(email, password)
    //see if email users exists

    //if it does exist return an error

    //if it is a new email create a new users

    //respond to the request
}