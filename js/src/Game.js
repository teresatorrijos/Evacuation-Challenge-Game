


function RenderGame() {

}

function RenderBoard() {


}

var board;
// function printScore() {
// 	$("#pairs_clicked").html(memoryGame.pairsClicked);
// 	$("#pairs_guessed").html(memoryGame.correctPairs);
// }
function printQuantityPeople() {
  $("quantity-people").html(board.room)
}

$(document).ready(function(){
  board = new Board();
  var html = '';
  board.start();
  board.rooms.forEach(function() {
    html += '<div class= "room">';
    html += '<div class= "quantity-people">';
    html += '</div>';
    html += '</div>';
  });
  board.perimeter.forEach(function() {
    html += '<div class= "unbreakable-wall">';
    html += '</div>';
  });
  document.getElementById('board').innerHTML = html;
});
