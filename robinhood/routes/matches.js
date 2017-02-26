var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('matches', { match1: '12-2-2016', match2:'01-02-2017' });
});

module.exports = router;
