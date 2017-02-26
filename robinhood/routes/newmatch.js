var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newmatch', { todaysdate:'2014-02-09', name:'joe blow'} );
});

module.exports = router;
