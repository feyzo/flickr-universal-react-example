const express = require('express');
const router = express.Router();
const getFlickrImages = require('../helpers/flickr');

/* GET home page. */
router.get('*', function(req, res) {
  res.renderFile('../public/index.html');
});

router.get('/api/flickr', function(req, res) {
  //Send flickr response as api response without parsing
  
  getFlickrImages().pipe(res);
  // res.type('json');
});

module.exports = router;
