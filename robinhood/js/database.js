var knex = require('../js/knex');

module.exports = {

  getUsers: function(){
    return knex('Archers');
  },
  getMatches: function(id){
    return knex('Matches')
      .where('ArcherID', id);
  },
  getMatch: function(id){
    return knex('Rounds')
    .innerJoin('Games', 'Rounds.GameID', '=', 'Games.GameID')
    .innerJoin('Matches', 'Games.MatchID', '=', 'Matches.MatchID')
    .where('Matches.MatchID', '=', id)
  }
}
