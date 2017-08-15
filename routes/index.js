const express = require('express');
const router = express.Router();
const{getAllAlbums} = require('../db/albums')
const {createReview,
  getRecentReview,
  getAllReviewByUserId,
  deleteReveiwById
}  = require('../db/reviews')

/* GET home page. */
router.get('/', function(req, res) {
  getAllAlbums()
  .then( albums =>{
    res.render('index', {albums: albums});
  }).catch(err => {
    console.error(err)
  })
});

module.exports = router;
