
exports.seed = function(knex, Promise) {

  return knex('Matches').del()
    .then(function () {
      return Promise.all([
        knex('Archers')
      ])
    })
      .then(function(data){
        var Archers = data[0];
        return knex('Matches').insert([{  ArcherID: searchForId(Archers, "JoeBlow"),
                                  ScoreKeeper: searchForId(Archers, "JoeBlow"),
                                  Location: 'Bear Valley Archery'},
                                  {ArcherID: searchForId(Archers, "JoeBlow"),
                                  ScoreKeeper: searchForId(Archers, "JoeBlow"),
                                  Location: 'Bobs back yard'},
                                  {ArcherID: searchForId(Archers, "SallyMae"),
                                  ScoreKeeper: searchForId(Archers, "SallyMae"),
                                  Location: 'Bear Valley Archery'},
                                  {ArcherID: searchForId(Archers, "SallyMae"),
                                  ScoreKeeper: searchForId(Archers, "SallyMae"),
                                  Location: 'paradise hills'}])
      })
};

function searchForId(data, string) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].ScreenName == string)
      return data[i].ArcherID;
  }
}
