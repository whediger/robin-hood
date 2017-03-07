var express = require('express');
var db = require('../js/database');
var appjs = require('../js/appjs');
var auth = require('../js/auth');

var router = express.Router();

router.use(auth.isLoggedIn);

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

router.get('/delete/:id', function(req, res, next){
  var temp = db.deleteMatch(req.params.id)
  res.render('matches', { isDeleted: temp });
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
