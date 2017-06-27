


function RenderGame() {

}

function RenderBoard() {


}

var board;



$(document).ready(function(){
  board = new Board();
  var html = '';
  board.start();
  for(var i=0; i<board.array.length-1; i+=2) {
    html += '<div class= "row">';
    for (var j=0; j<board.array[i].length-1; j+=2) {
      html += '<div class= "square">';
      html += '</div>';
      html += '<div class= "horizontal-wall">';
      html += '</div>';
    }
    html += '<div class= "square">';
    html += '</div>';
    html += '</div>';
    html += '<div class= "row">';
    for (var x=0; x<board.array[i].length-1; x+=2) {
      html += '<div class= "vertical-wall">';
      html += '</div>';
      html += '<div class= "room">';
      html += '<div class= "quantity-people">';
      html += '</div>';
      html += '</div>';
    }
    html += '<div class= "vertical-wall">';
    html += '</div>';
    html += '</div>';
  }
  html += '<div class= "row">';
  for (var y=0; y<board.array[0].length-1; y+=2) {
    html += '<div class= "square">';
    html += '</div>';
    html += '<div class= "horizontal-wall">';
    html += '</div>';
  }
  html += '<div class= "square">';
  html += '</div>';
  document.getElementById('board').innerHTML = html;
});
