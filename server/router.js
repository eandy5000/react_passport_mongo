const Authenticaiton = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', {session: false})


module.exports = function(app) {

app.get('/',requireAuth ,(req, res) => {
    res.send("Hi there auth")
})

app.post('/signup', Authenticaiton.signup)

}