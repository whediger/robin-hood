var express = require('express');
var db = require('../js/database');
var auth = require('../js/auth');
var router = express.Router();

router.get('/newuser', function(req, res, next) {
  res.render('newuser');
});

router.post('/newuser', function(req, res, next){
  db.findUserByScreenName(req.body.ScreenName)
  .then(function(user){
    if(user){
      res.render('newuser', {error: "User already exists, please try a different name"});
    } else {
      auth.createUser(req.body)
      .then(function(id){
        req.session.userId = id;
        res.redirect('/home');
      });
    }
  })
});

router.post('/login', function(req, res, next){
  auth.passport.authenticate('local', function(err, user, info){
    if (err) {
      res.render('./', { error: err });
    } else if (!user) {
      res.redirect('./');
    } else if (user){
      req.session.userId = user.ArcherID;
      res.redirect('/home');
    }
  })(req, res, next);
});


router.get('/logout', function(req, res, next){
  req.session = null;
  res.render('logout');
});

module.exports = router;
