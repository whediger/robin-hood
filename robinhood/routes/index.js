var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RobinHood', name:'wes' });
});

router.get('/newmatch', function(req, res, next) {
  res.render('newmatch');
});

module.exports = router;
