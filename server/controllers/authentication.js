const User = require('../models/user')

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

        user.save(function(err){
            if(err){return next(err)}
            res.json({"success": true})
        })
    })

}