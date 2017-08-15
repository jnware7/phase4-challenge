const express = require('express');
const router = express.Router();

// reviews
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// review/new

// reviews

// reviews/:id

//post reviews/:id

// delete reviews/:id

module.exports = router;
