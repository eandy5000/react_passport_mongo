const mongoose = require('mongoose')
const Schema = mongoose.Schema

//defining our model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
})

//create model class, it points to all users
const ModelClass = mongoose.model('user', userSchema)

module.exports = ModelClass