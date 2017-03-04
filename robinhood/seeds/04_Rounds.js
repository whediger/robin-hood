
exports.seed = function(knex, Promise) {
  return knex('Rounds').del()
  .then(function(){
    return Promise.all([
      knex('Games')
    ])
  })
  .then(function (data) {
    var games = data[0];
    var round = new Array();

    for (var i = 0; i < games.length; i++) {
      for (var r = 1; r <= 4; r++) {
        round.push({
                   GameID: games[i].GameID,
              RoundNumber: r,
           FirstShotScore: 'X',
          SecondShotScore: 'X',
           ThirdShotScore: getThirdShotScore(),
          FourthShotScore: getRandScore(),
           FifthShotScore: getRandScore()
        })
      }
    }
    return knex('Rounds').insert(round);
  });
};

function getGameID(data, gameArrNum){
  for (var i = 0; i < data.length; i++) {
    if (i === gameArrNum)
      return data[i].GameID;
  }
}

function getRandScore() {
  return Math.ceil(5 - (Math.random() * 3))
}

function getThirdShotScore(){
  if(Math.ceil(Math.random() * 3) == 1) return 'X';
  else return getRandScore();
}
