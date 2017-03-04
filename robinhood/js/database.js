var knex = require('../js/knex');
var moment = require('moment');

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
    .then(function(match){
      var score  = {
               date: moment(match[0].DateTime).format("dddd, MMMM Do YYYY, h:mm a"),
        scoreKeeper: "",
         game1Score: 0,
          game1XCnt: 0,
         game2Score: 0,
          game2XCnt: 0,
         game3Score: 0,
          game3XCnt: 0,
         totalScore: 0,
             xcount: 0
      }
      var total = 0;
      var xcount = 0;
      var gameCount = 1;
      var gameScorer = 0;

      for (var i = 1; i <= match.length; i++) {
        score = addScore(score, gameCount, match[i - 1].FirstShotScore);
        score = addScore(score, gameCount, match[i - 1].SecondShotScore);
        score = addScore(score, gameCount, match[i - 1].ThirdShotScore);
        score = addScore(score, gameCount, match[i - 1].FourthShotScore);
        score = addScore(score, gameCount, match[i - 1].FifthShotScore);
        if(i % 4 == 0) gameCount++;
      }
      match.push(score);
      return match;
    })
    .then(function(data){
      knex('Archers').where('Archers.ArcherID', '=', data[1].ScoreKeeper)
      .then(function(scoreKeeper){
        data[12].scoreKeeper = scoreKeeper[0].ScreenName;
      })
      return data
    });
  }
}

function addScore(score, gameNumber, shotScore){
  if(shotScore == 'X'){
    score.totalScore += 5;
    score.xcount++;
    if(gameNumber == 1) score.game1Score += 5;
    if(gameNumber == 1) score.game1XCnt++;
    if(gameNumber == 2) score.game2Score += 5;
    if(gameNumber == 2) score.game2XCnt++;
    if(gameNumber == 3) score.game3Score += 5;
    if(gameNumber == 3) score.game3XCnt++;
  }
  if(shotScore != 'X'){
    score.totalScore += parseInt(shotScore);
    if(gameNumber == 1) score.game1Score += parseInt(shotScore);
    if(gameNumber == 2) score.game2Score += parseInt(shotScore);
    if(gameNumber == 3) score.game3Score += parseInt(shotScore);
  }
  return score;
}
