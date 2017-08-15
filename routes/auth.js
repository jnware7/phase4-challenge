const { getUserByEmail, getUserById } = require('../db/users')
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, password, done) {
    getUserByEmail(email)
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect useremail.' })
      }
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return done(error)
        }
        if (!result) {
          return done(null, false)
        }
        return done(null, user)
      })
    })
    .catch(error => {
      return done(null, false, { message: 'Incorrect useremail.' })
    })
  })
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (userId, done) {
  getUserById(userId)
    .then(user => {
      done(null, user)
    })
})

module.exports = { passport }
