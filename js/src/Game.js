var Game = function(map, player) {
  this.isFinished = false;
  this.level = 0;
  this.player = player;
};

var player1Score = 0;
var player2Score = 0;

Game.prototype.stopFirstGame = function() {
  player1Score = this.player.score;
  this.scorePlayer1 = player1.score;
  $("#board").children().remove();
  $("#board").append("<div></div>");
  $("#board").children().addClass("alert").text("Now it's up to player 2");
  $(".alert").append("<button id='continue'> Continue </button>");
  var that = this;
  $('#continue').on('click', function() {
    $(".alert").remove();
    if (that.level === 1) {
      that.restartGame(plan1);
    } else {
      that.restartGame(plan2);
    }
  });
};

Game.prototype.finalScore = function() {
  if (player1Score>player2Score) {
    return "PLAYER 1 WIN!!";
  } else {
    return "PLAYER 2 WIN!!";
  }
};

Game.prototype.stopSecondGame = function() {
  player2Score = this.player.score;
  this.scorePlayer2 = player2.score;
  $("#board").children().remove();
  $("#board").append("<div></div>");
  var text = this.finalScore();
  $("#board").children().addClass("alert").text(text);
  $(".alert").append("<button id='start'> New Game </button>");
  var that = this;
  $('#start').on('click', function() {
    $(".alert").remove();
    that.startNewGame();
  });
};

Game.prototype.restartGame = function(plan) {
  var board2 = new Board(plan);
  var player2 = new Player(board2, "player 2");
  var game2 = new Game(board2, player2);
  game2.isFinished = true;
  game2.startGame(board2, player2);
};

Game.prototype.startNewGame = function() {
  $("#right-panel").children().remove();
  renderInitialScreen();
  initialFunction();
};

Game.prototype.startGame = function(map, player) {
  map.start();
  var counter = map.maxTime;
  renderBoard(map);
  var tries = 0;
  $(".horizontal-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    this.parentElement.isOpen = true;
    map.tries += 1;
    map.horMove(row, col);
    map.printQuantityPeople();
    player.updateScore();
    tries += 1;
  });

  $(".vertical-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    this.parentElement.isOpen = true;
    map.tries += 1;
    map.verMove(row, col);
    map.printQuantityPeople();
    player.updateScore();
    tries += 1;
  });


  var that = this;
  var intervalId = setInterval(function() {
    if (tries >= map.maxTries) {
      counter = 0;
    }
    if (counter > 0) {
      $("#timer").html(counter);
    } else {
      clearInterval(intervalId);
      if (that.isFinished === false) {
        $("#timer").html(counter);
        that.stopFirstGame();
      } else {
        $("#timer").html(counter);
        that.stopSecondGame();
      }
    }
    counter--;
  }, 1000);

};


Game.prototype.calculatePath = function(plan) {
  for (var i = 1; i < plan.length - 1; i += 2) {
    for (var j = 1; j < plan.length; j += 2) {
      var path = new Path(plan[i][j], board.hallExit, plan);
    }
  }
};


var initialFunction = function() {
  $('#level1').on('click', function() {
    $(".initial-screen").remove();
    var board1 = new Board(plan1);
    var player1 = new Player(board1, "player 1");
    var game = new Game(board1, player1);
    game.startGame(board1, player1);
    game.level = 1;
  });

  $('#level2').on('click', function() {
    $(".initial-screen").remove();
    var board1 = new Board(plan2);
    var player1 = new Player(board1, "player 1");
    var game = new Game(board1, player1);
    game.startGame(board1, player1);
    game.level = 2;
  });
};

$(document).ready(function() {
  renderInitialScreen();
  initialFunction();
});
