var express = require('express');
var router = express.Router();
const{
  createUser,
  getUserById,
  getUserProfileInfoById,
  getUserByEmail
} = require('../db/users')

const {createReview,
  getRecentReview,
  getAllReviewByUserId,
  getAllReviewByAlbumId,
  deleteReveiwById
}  = require('../db/reviews')

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

router.post('/new',  (req, res, next) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  createUser(username, password, email)
    .then(user => {
      req.login(user, function(error){
        if(error) return next(error)
        res.redirect('/users/profile')
      })
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
      return res.redirect('/users/profile')
    })
  })(req, res, next)
})


router.get('/profile', (req, res) => {
  console.log(req.user.id)
  const id = req.user.id
  Promise.all([
    getUserById(id),
    getAllReviewByUserId(id)
  ])
  .then(results => {
    const user = results[0]
    const reviews = results[1]
    res.render('profile', {
      user: user,
      reviews: reviews
    })
  }).catch(err => {
    console.error(err)
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;
