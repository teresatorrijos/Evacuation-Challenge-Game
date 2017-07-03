var Game = function(map, player) {
  this.isFinished = false;
  this.level = 0;
  this.player = player;
  this.plan = map;
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
  if (player1Score > player2Score) {
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

Game.prototype.checkPath = function() {
  var graph = new Graph(this.plan.grid);
  var end = graph.grid[this.plan.hallCoord.row][this.plan.hallCoord.col];
  var result;
  for (var i = 1; i < graph.grid.length - 1; i += 2) {
    for (var j = 1; j < graph.grid.length - 1; j += 2) {
      result = astar.search(graph, graph.grid[i][j], end);
      if (result.length !== 0) {
        this.plan.hallExit.numberPeople += this.plan.array[i][j].numberPeople;
        this.plan.array[i][j].numberPeople = 0;
      }
    }
  } console.log(result);
};

Game.prototype.startGame = function(map, player) {
  map.start();
  var that=this;
  var counter = map.maxTime;
  renderBoard(map);
  var tries = 0;
  $(".horizontal-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    map.array[row][col].isOpen = true;
    console.log(map.array[row][col].isOpen);
    map.tries += 1;
    map.horMove(row, col);
    map.updateGrid();
    tries += 1;
    that.checkPath();
    map.printQuantityPeople();
    player.updateScore();
  });

  $(".vertical-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    map.array[row][col].isOpen = true;
    map.tries += 1;
    map.verMove(row, col);
    map.updateGrid();
    tries += 1;
    that.checkPath();
    map.printQuantityPeople();
    player.updateScore();

  });


  var thats = this;
  var intervalId = setInterval(function() {
    if (tries >= map.maxTries) {
      counter = 0;
    }
    if (counter > 0) {
      $("#timer").html(counter);
    } else {
      clearInterval(intervalId);
      if (thats.isFinished === false) {
        $("#timer").html(counter);
        thats.stopFirstGame();
      } else {
        $("#timer").html(counter);
        thats.stopSecondGame();
      }
    }
    counter--;
  }, 1000);

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
