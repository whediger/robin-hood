var knex = require('../js/knex');

module.exports = {

  getUsers: function(){
    return knex('Archers');
  },
  getMatches: function(){
    return knex('Matches');
  }
}
