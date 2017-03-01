
module.exports = {
  matchDateFormatter: function(matches){
    for (var i = 0; i < matches.length; i++) {
      console.log(matches[i].DateTime);
      var dateT = matches[i].DateTime;
      matches[i].DateTime = dateT.charAt(24);
    }
  }
}
