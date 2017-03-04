var express = require('express');
var db = require('../js/database');
var appjs = require('../js/appjs');
var router = express.Router();

//NOTE No route to 'matches' used
router.get('/', function(req, res, next) {
  db.getMatches(req.session.userId)
  .then(function(data){
    appjs.matchDateFormatter(data);
    res.render('matches', { matches: data });
  });
});

router.get('/newmatch', function(req, res, next){
  res.render('newmatch');
});

router.post('/delete', function(req, res, next){
  res.render('matches');
});

router.get('/edit', function(req, res, next){
  res.render('editmatch');
});

router.get('/match/:id', function(req, res, next) {
  var matchid = req.params.id;
  db.getMatch(matchid)
  .then(function(data){
    res.render('match', { match: data });
  })
});

module.exports = router;
