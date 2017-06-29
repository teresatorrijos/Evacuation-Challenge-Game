var Player = function(board) {
  this.board = board;
  this.score = 0;
};

Player.prototype.updateScore = function(player) {
  this.score = this.board.hallExit.numberPeople;
  $("#player1").html("player 1: <b>" + this.score + "</b> people");
};
