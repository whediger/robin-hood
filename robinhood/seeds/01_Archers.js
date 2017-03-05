var bcrypt = require('bcrypt');
var env = require('dotenv').load();
require('dotenv').load();

var salt = bcrypt.genSaltSync(8)
var hash = bcrypt.hashSync(process.env.HASH_WORD, salt);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Archers').del()
    .then(function () {
      return knex('Archers').insert([
        {ScreenName: 'JoeBlow', Password: hash},
        {ScreenName: 'SallyMae', Password: hash},
        {ScreenName: 'ScreenName', Password: hash}
      ]);
    });
};
