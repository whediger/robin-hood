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

router.post('/newmatch', function(req, res, next){
  req.body.ArcherID = req.session.userId;
  db.createMatch(req.body)
  .then(function(datetime){
    res.render('/startmatch');
  });
})

router.get('/delete/:id', function(req, res, next){
  db.deleteMatch(req.params.id)
  .then(function(){
    res.redirect('matches');
  })

});

router.get('/edit', function(req, res, next){
  res.render('editmatch');
});

router.get('/match/:id', function(req, res, next) {
  var matchid = req.params.id;
  db.getMatch(matchid)
  .then(function(data){
    if(data.err) res.render('editmatch');
    else res.render('match', { match: data });
  })
});

module.exports = router;
