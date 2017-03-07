var knex = require('../js/knex');
var moment = require('moment');

module.exports = {
  findUserByScreenName: function(name) {
    return knex('Archers').where('Archers.ScreenName', '=', name).first();
  },
  getUsers: function(){
    return knex('Archers');
  },
  addUser: function(data){
    return knex('Archers').insert(data, 'ArcherID');
  },
  getMatches: function(id){
    return knex('Matches')
      .where('ArcherID', id);
  },
  createMatch: function(data){
    data.DateTime = moment().utc(data.DateTime).format();
    return knex('Matches').insert(data).returning('MatchID')
    .then(function(MatchID){
      var games = new Array();
      for(var i = 1; i <= 3; i++){
        var game = {
          MatchID: MatchID[0],
          GameNumber: i,
          GameFinished: false
        }
        games.push(game);
      }
      return knex('Games').insert(games).returning('GameID');
    }).then(function(data){
      var rounds = new Array();
      for (var i = 0; i < 3; i++){
        for (var j = 1; j <= 4; j++){
          var round = {
            GameID: data[i],
            RoundNumber: j,
            FirstShotScore: '-',
            SecondShotScore: '-',
            ThirdShotScore: '-',
            FourthShotScore: '-',
            FifthShotScore: '-'
          }
          rounds.push(round);
        }
      }
      return knex('Rounds').insert(rounds);
    })
  },
  deleteMatch: function(id){
    return knex('Matches').where('MatchID', '=', id).del();
  },
  getMatch: function(id){
    //this will evaluate to nothing because if the match has not been recorded
    return knex('Rounds')
    .innerJoin('Games', 'Rounds.GameID', '=', 'Games.GameID')
    .innerJoin('Matches', 'Games.MatchID', '=', 'Matches.MatchID')
    .where('Matches.MatchID', '=', id)
    .then(function(match){
      if(match[0]){
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
        //if the match has not been started the query will return nothing
        //so else return err and redirect to edit page.
      } else return { err: "this match has not been recorded" }
    })
    .then(function(data){
      if (!data.err){
        knex('Archers').where('Archers.ArcherID', '=', data[1].ScoreKeeper)
        .then(function(scoreKeeper){
          data[12].scoreKeeper = scoreKeeper[0].ScreenName;
        })
      }
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
