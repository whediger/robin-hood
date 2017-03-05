var db = require('./database');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
    usernameField: 'ScreenName',
    passwordField: 'Password'
  },
  function(username, password, done){
  db.findUserByScreenName(username)
  .then(function(user, err){
    if(!user) {
      return done("Error: User does not exist")
    } else if(user && bcrypt.compareSync(password, user.Password)) {
      return done(null, user)
    } else {
      return done("Error: password is incorrect")
    }
  })
}));

module.exports = {
    passport: passport,
  createUser: function(body) {
    var salt = bcrypt.genSaltSync(8)
    var hash = bcrypt.hashSync(body.Password, salt);
    body.Password = hash;
    return db.addUser(body)
    .then(function(id){
      return id[0];
    })
  },
  isLoggedIn: function(req, res, next){
    if (req.session.userId) {
      res.redirect('/home');
    } else {
      next();
    }
  }
}
