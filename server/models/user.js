const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    }
})

//on save hook encrypt password
UserSchema.pre('save', function(next){
   //gives us access to the user model
    const user = this

//gens a salt, which is async, then our callback
    bcrypt.genSalt(10, function(err, salt){
            if (err) {return next(err)}
//hash/encrypt our password using salt/randomData
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){return next(err)}
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){return callback(err)}
        callback(null, isMatch)
    })
}

const ModelClass = mongoose.model('user', UserSchema)

module.exports = ModelClass