const express = require('express');
const router = express.Router();
const{getAllAlbums} = require('../db/albums')
const {createReview,
  getRecentReview,
  getAllReviewByUserId,
  deleteReveiwById
}  = require('../db/reviews')


router.get('/', function(req, res) {
  getAllAlbums()
  .then( albums =>{
    res.render('index', {albums: albums});
  }).catch(err => {
    throw err
    console.error((err.message), {albums: albums} )
  })
});

module.exports = router;
