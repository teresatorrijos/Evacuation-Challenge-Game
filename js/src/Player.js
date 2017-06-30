var Player = function(map, name) {
  this.board = map;
  this.score = 0;
  this.name = name;
};

Player.prototype.updateScore = function() {
  this.score = this.board.hallExit.numberPeople;
  $("#player1").html("_"+this.name+": <b>" + this.score + "</b> people");
};
