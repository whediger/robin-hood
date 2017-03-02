
exports.seed = function(knex, Promise) {
  return knex('Games').del()
  .then(function () {
    return Promise.all([
      knex('Archers'),
      knex('Matches')
    ])
  })
  .then(function(data){
    var Archers = data[0];
    var Matches = data[1];
    var games = new Array();

    for (var i = 0; i < Matches.length; i++) {
      for (var g = 1; g <= 3; g++) {
        games.push({
          MatchID: Matches[i].MatchID,
          GameNumber: g,
          GameFinished: true
        })
      }
    }
    return knex('Games').insert(games);
  });
};
