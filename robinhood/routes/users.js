var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/newuser', function(req, res, next) {
  res.send('newuser');
});

module.exports = router;
