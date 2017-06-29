var Game = function(board, numberPlayers) {
  this.status = "initial";
  this.board = board;
};

Game.prototype.initialScreen = function(){
  var initial = $('<div></div>').addClass("initial-screen");
  $("#right-panel").append("<div></div>").text("Choose a level to start").addClass("initial-screen");
  $(".initial-screen").append("<button id='level1'> Level 1 </button>");
  $(".initial-screen").append("<button id='level2'> Level 2 </button>");
};

var board;
var player1;
Game.prototype.startGame = function() {
  board = new Board(plan1);
  player1 = new Player(board);
  board.start();
  renderBoard();
  $(".horizontal-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    this.parentElement.isOpen = true;
    board.horMove(row, col);
    board.printQuantityPeople();
    player1.updateScore();
  });

  $(".vertical-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    this.parentElement.isOpen = true;
    board.verMove(row, col);
    board.printQuantityPeople();
    player1.updateScore();
  });

  var counter = 10;
  var intervalId = setInterval(function() {
    if (counter >= 0) {
      $("#timer").html(counter);
      // console.log(counter);
    } else {
      // console.log("Game Over");
      clearInterval(intervalId);
    }
    counter--;
  }, 1000);
};

$(document).ready(function() {
  var game = new Game(plan2, 2);
  game.initialScreen();
  // game.startGame();

});
