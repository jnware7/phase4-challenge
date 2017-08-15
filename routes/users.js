var express = require('express');
var router = express.Router();
const{
  createUser,
  getUserById,
  getUserProfileInfoById,
  getUserByEmail
} = require('../db/users')

const { passport } = require('./auth')
//
// const checkIfEmailExists = (req,res, next) => {
//   getUserByEmail(req.body.email)
//   .then( result => {
//     if(!result.length) {
//       next()
//     } else{
//       throw new Error('Email already in use')
//     }
//   })
//   .catch( error => res.redirect('/'))
// }

router.post('/new',  (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  createUser(username, password, email)
    .then(user => {
      res.redirect('/')
    })
})

router.get('/new', (req, res) => {
  res.render('signup')
})

router.get('/', (req, res) => {
  res.render('signin')
})

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.render('signin', {message: 'Invalid Email or Password'}) }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.redirect('/profile')
    })
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;
