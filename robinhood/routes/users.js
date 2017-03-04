var express = require('express');
var db = require('../js/database')
var router = express.Router();

/* GET users listing. */
router.get('/newuser', function(req, res, next) {
  res.render('newuser');
});

router.post('/newuser', function(req, res, next){
  db.addUser(req.body)
  .then(function(id){
    res.redirect('/home/' + id);
  })
});

module.exports = router;
