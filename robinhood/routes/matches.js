var express = require('express');
var router = express.Router();

//NOTE No route to 'matches' used
router.get('/', function(req, res, next) {
  res.render('matches', { match1: '12-2-2016', match2:'01-02-2017' });
});

router.get('/newmatch', function(req, res, next){
  res.render('entermatch');
});

router.post('/delete', function(req, res, next){
  res.render('matches');
});

router.get('/edit', function(req, res, next){
  res.render('editmatch');
});

router.get('/match/:id', function(req, res, next) {
  var matchid = req.params.id;
  res.render('match', { matchid: matchid});
});

module.exports = router;
