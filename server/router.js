const Authenticaiton = require('./controllers/authentication')

module.exports = function(app) {

app.get('/', (req, res) => {
    res.send("Hi there")
})

app.post('/signup', Authenticaiton.signup)

}