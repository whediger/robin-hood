
exports.seed = function(knex, Promise) {
  return knex('Games').del()
  .then(function () {
    return Promise.all([
      knex('Matches')
    ])
  })
  .then(function(data){
    var joesMatch = data[0][0].MatchID;
    var otherMatch = data[0][1].MatchID;
    return knex('Games').insert([
      {MatchID: joesMatch,
        GameNumber: 1,
        GameFinished: true},
      {MatchID: joesMatch,
        GameNumber: 2,
        GameFinished: true},
      {MatchID: joesMatch,
        GameNumber: 3,
        GameFinished: true},
      {MatchID: otherMatch,
        GameNumber: 1,
        GameFinished: false }
    ])
  });
};
