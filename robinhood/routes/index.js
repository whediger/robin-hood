var express = require('express');
var router = express.Router();
var knex = require('../js/knex.js');
var db = require("../js/database");

router.get('/', function(req, res, next){
  res.render('index');
});

router.get('/home', function(req, res, next){
    res.render('home');
});

//TODO move get login to users routes
router.get('/login', function(req, res, next){
  db.getUsers()
  .then(function(users){
    res.render('login', { archers: users });
  })
});

router.get('/logout', function(req, res, next){
  req.session = null;
  res.render('logout');
});

module.exports = router;
