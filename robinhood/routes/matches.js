var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('matches', { match1: '12-2-2016', match2:'01-02-2017' });
});

router.get('/match/:id', function(req, res, next) {
  var matchid = req.params.id;
  res.render('match', { matchid: matchid});
});

router.post('/newmatch', function(req, res, next){
  console.log("hit the route");
  res.render('entermatch');
});

module.exports = router;
