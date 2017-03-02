

module.exports = {
  matchDateFormatter: function(matches){
    for (var i = 0; i < matches.length; i++) {
      var date = matches[i].DateTime.toString();
      matches[i].DateTime = date.substring(0, 21);
    }
  }
}
