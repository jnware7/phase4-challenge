const express = require('express');
const router = express.Router();
const{getAllAlbums, getAlbumById} = require('../db/albums')
const {createReview,
  getRecentReview,
  getAllReviewByUserId,
  getAllReviewByAlbumId,
  deleteReveiwById
}  = require('../db/reviews')

// create new-review

router.post('/:id/new', (req, res) => {
  const id = req.params.id
  const users_id = req.user.id
  const review = req.body.review
  newReview({
    albums_id: albums_id,
    users_id: users_id,
    review: review
  })
  .then(() => {
    res.redirect('/profile')
  })
})

// review/new
router.get('/:id/new', function(req, res) {
  const id = req.params.id
  getAlbumById(id)
  .then( albums =>{
    res.render('new-review', {albums: albums});
  }).catch(err => {
    throw err
    console.error((err.message), {albums: albums} )
  })
});

// reviews/:id
router.get('/:id', (req, res) => {
  const {id} = req.params
  Promise.all([
    getAlbumById(id),
    getAllReviewByAlbumId(id)
  ])
  .then(results => {
    const albums = results[0]
    const reviews = results[1]
    res.render('album-page', {
      albums: albums,
      reviews: reviews
    })
  }).catch(err => {
    throw err
    console.error(err)
  })
})

// reviews/:id

// delete reviews/:id
router.get('/:id', (req, res) => {
  const {id} = req.params
  deleteReviewById(id)
  .then(() => {
    res.redirect('/profile')
  }).catch(err => {
    throw err
    console.error(err)
  })
})


module.exports = router;
