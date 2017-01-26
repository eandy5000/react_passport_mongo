const Authenticaiton = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})


module.exports = function(app) {

app.get('/',requireAuth ,(req, res) => {
    res.send({ message: 'You have now been cleared'})
})

app.post('/signin', requireSignin ,Authenticaiton.signin)
app.post('/signup', Authenticaiton.signup)

}