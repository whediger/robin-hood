var knex = require('../js/knex');

module.exports = {

  getUsers: function(){
    return knex('Archers');
  },
  getMatches: function(id){
    return knex('Matches')
      .where('ArcherID', id);
  }
}
