
exports.seed = function(knex, Promise) {
  return knex('Rounds').del()
  .then(function(){
    return Promise.all([
      knex('Games')
    ])
  })
  .then(function (data) {
    var games = data[0];
    return knex('Rounds').insert([
      {GameID: 1, RoundNumber: 1, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
      {GameID: 1, RoundNumber: 2, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
      {GameID: 1, RoundNumber: 3, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
      {GameID: 1, RoundNumber: 4, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
      {GameID: 2, RoundNumber: 1, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
      {GameID: 2, RoundNumber: 2, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
      {GameID: 2, RoundNumber: 3, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
      {GameID: 2, RoundNumber: 4, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
      {GameID: 3, RoundNumber: 1, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
      {GameID: 3, RoundNumber: 2, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
      {GameID: 3, RoundNumber: 3, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
      {GameID: 3, RoundNumber: 4, FirstShotScore: 'X', SecondShotScore: 'X',
        ThirdShotScore: 'X', FourthShotScore: '4', FifthShotScore: '4'},
    ]);
  });
};

function getGameID(data, gameArrNum){
  for (var i = 0; i < data.length; i++) {
    if (i === gameArrNum)
      return data[i].GameID;
  }
}
