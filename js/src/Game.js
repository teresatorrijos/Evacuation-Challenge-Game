var Game = function(plan, player) {
  // this.status = "initial";
  // this.savedScore = 0;
  this.isFinished = false;
  this.level = 0;
  // this.map = map;
};

Game.prototype.stopFirstGame = function() {
  // player.score = this.savedScore;
  $("#board").children().remove();
  $("#board").append("<div></div>");
  $("#board").children().addClass("alert").text("Now it's up to player 2");
  $(".alert").append("<button id='continue'> Continue </button>");
  var that = this;
  $('#continue').on('click', function() {
    $(".alert").remove();
    that.restartGame();
  });
};

Game.prototype.finalScore = function() {
  if (player1.score > player2.score) {
    return "PLAYER 1 WIN!!";
  } else {
    return "PLAYER 2 WIN!!";
  }
};

Game.prototype.stopSecondGame = function() {
  $("#board").children().remove();
  $("#board").append("<div></div>");
  var text = this.finalScore();
  $("#board").children().addClass("alert").text(text);
  $(".alert").append("<button id='start'> Start New Game </button>");
  var that = this;
  $('#continue').on('click', function() {
    $(".alert").remove();
    that.startNewGame();
  });
};

Game.prototype.restartGame = function() {
  var board2 = new Board(plan2);
  var player2 = new Player(board2);
  var game2 = new Game(board2, player2);
  game2.startGame(board2, player2);
  this.isFinished = true;
};

Game.prototype.startNewGame = function() {

};

Game.prototype.startGame = function(board, player) {
  board.start();
  var counter = board.maxTime;
  renderBoard(board);
  var tries = 0;
  $(".horizontal-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    this.parentElement.isOpen = true;
    board.tries += 1;
    board.horMove(row, col);
    board.printQuantityPeople();
    player.updateScore();
    tries += 1;
  });

  $(".vertical-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    this.parentElement.isOpen = true;
    board.tries += 1;
    board.verMove(row, col);
    board.printQuantityPeople();
    player.updateScore();
    tries += 1;
  });


  var that = this;
  var intervalId = setInterval(function() {
    if (tries === board.maxTries) {
      counter = 0;
    }
    if (counter >= 0) {
      $("#timer").html(counter);
    } else {
      clearInterval(intervalId);
      if (that.isFinished === false) {
        that.stopFirstGame();
      } else {
        that.stopSecondGame();
      }
    }
    counter--;
  }, 1000);

};

$(document).ready(function() {
  renderInitialScreen();

  $('#level1').on('click', function() {
    $("#initial").remove();
    var board = new Board(plan1);
    var player1 = new Player(board);
    var game = new Game(board, player1);
    game.startGame(board, player1);
    game.level = 1;
  });

  $('#level2').on('click', function() {
    $("#initial").remove();
    var board = new Board(plan2);
    var player1 = new Player(board);
    var game = new Game(board, player1);
    game.startGame(board, player1);
    game.level = 2;
  });

});
