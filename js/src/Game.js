

var board;
$(document).ready(function() {
  board = new Board(plan2);
  board.start();
  renderBoard();
  $(".horizontal-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    this.parentElement.isOpen = true;
    board.horMove(row, col);
    board.printQuantityPeople();
  });

  $(".vertical-partition").click(function(e) {
    $(this).toggleClass("disabled");
    var col = parseInt($(this).parent().attr("col"));
    var row = parseInt($(this).parent().attr("row"));
    this.parentElement.isOpen = true;
    board.verMove(row, col);
    board.printQuantityPeople();
  });

  var counter = 10;
  var intervalId = setInterval(function() {
    if (counter>=0) {
      $("#timer").html(counter);
      console.log(counter);
    } else {
      console.log("Game Over");
      clearInterval(intervalId);
    }
    counter--;
  }, 1000);

});
