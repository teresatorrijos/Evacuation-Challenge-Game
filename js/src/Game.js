var Game = function(plan, player) {
  // this.status = "initial";
  // this.savedScore = 0;
  this.isFinished = false;
  this.level = 0;
  // this.map = map;
};

Game.prototype.stopFirstGame= function(player) {
  // player.score = this.savedScore;
  $("#board").children().remove();
  $("#board").append('<div></div>').addClass("alert").text("Now it's up to player 2");
  $(".alert").append("<button id='continue'> Continue </button>");
  var that = this;
  $('#continue').on('click', function(){
  $( ".alert" ).remove();
  that.restartGame();
});
};

Game.prototype.restartGame = function() {
  var board2 = new Board (plan2);
  var player2 = new Player(board2);
  var game2 = new Game(board2, player2);
  game2.startGame(board2, player2);
};

Game.prototype.startNewGame = function() {
  renderInitialScreen();
};

Game.prototype.startGame = function(board, player) {
  var counter = 10;
  board.start();
  renderBoard(board);
  $(".horizontal-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    this.parentElement.isOpen = true;
    board.tries +=1;
    board.horMove(row, col);
    board.printQuantityPeople();
    player.updateScore();
    if (!board.canClick()) {
      counter=0;
    }
  });

  $(".vertical-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    this.parentElement.isOpen = true;
    board.tries +=1;
    board.verMove(row, col);
    board.printQuantityPeople();
    player.updateScore();
    if (!board.canClick()) {
      counter=0;
    }
  });

  var that=this;
  var intervalId = setInterval(function() {
    if (counter >= 0) {
      $("#timer").html(counter);
    } else {
      clearInterval(intervalId);
      if(that.isFinished === false) {
      that.stopFirstGame(player);
} else {
  // start
}
    }
    // if (!board.canClick()) {
    //   courter = 0;
    // }
    counter--;
  }, 1000);

};

$(document).ready(function() {
  renderInitialScreen();

  $('#level1').on('click', function(){
  $( "#initial" ).remove();
  var board = new Board (plan1);
  var player1 = new Player(board);
  var game = new Game(board, player1);
  game.startGame(board, player1);
  game.level = 1;
  });

  $('#level2').on('click', function(){
  $( "#initial" ).remove();
  var board = new Board (plan2);
  var player1 = new Player(board);
  var game = new Game(board, player1);
  game.startGame(board, player1);
  game.level = 2;
  });

});
