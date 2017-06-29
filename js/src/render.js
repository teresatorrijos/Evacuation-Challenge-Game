
function renderBoard() {
  var html = '';
  var html2 = '';
  for (var i = 0; i < board.array.length - 1; i += 2) {
    html += '<div class= "row-wall">';
    for (var j = 0; j < board.array[i].length - 1; j += 2) {
      html += '<div class= "square">';
      html += '</div>';
      if (board.array[i][j].canBreak === true) {
        html += '<div class= "horizontal-breakable" row=' + i + ' col=' + (j + 1) + '>';
        html += '<div class= "horizontal-partition">';
        html += '</div>';
        html += '</div>';
      } else if (board.array[i][j + 1].isExit === true) {
        html += '<div class= "horizontal-exit">';
        html += '</div>';
      } else {
        html += '<div class= "horizontal-wall">';
        html += '</div>';
      }
    }
    html += '<div class= "square">';
    html += '</div>';
    html += '</div>';
    html += '<div class= "row">';
    for (var x = 0; x < board.array[i].length - 1; x += 2) {
      if (board.array[i + 1][x].canBreak === true) {
        html += '<div class= "vertical-breakable" row=' + (i + 1) + ' col=' + x + '>';
        html += '<div class= "vertical-partition">';
        html += '</div>';
        html += '</div>';
      } else if (board.array[i + 1][x].isExit === true) {
        html += '<div class= "vertical-exit">';
        html += '</div>';
      } else {
        html += '<div class= "vertical-wall">';
        html += '</div>';
      }
      html += '<div class= "room">';
      html += '<div class= "quantity-people" id="' + (i + 1) +'-'+ (x +1) + '">';
      if (board.array[i + 1][x + 1].numberPeople !== 0){
      html += board.array[i + 1][x + 1].numberPeople;}
      html += '</div>';
      html += '</div>';
    }
    if (board.array[i + 1][board.array.length - 1].isExit === true) {
      html += '<div class= "vertical-exit">';
      html += '</div>';
    } else {
      html += '<div class= "vertical-wall">';
      html += '</div>';
    }
    html += '</div>';
  }
  html += '<div class= "row-wall">';
  for (var y = 0; y < board.array[(board.array.length - 1)].length - 1; y += 2) {
    html += '<div class= "square">';
    html += '</div>';
    if (board.array[(board.array.length - 1)][y + 1].isExit === true) {
      html += '<div class= "horizontal-exit">';
      html += '</div>';
    } else {
      html += '<div class= "horizontal-wall">';
      html += '</div>';
    }
  }
  html += '<div class= "square">';
  html += '</div>';
  html2 += '<div id="timer">';
  html2 += '</div>';
  html2 += '<div class="score">';
  html2 += '<div id="player1">';
  html2 += '</div>';
  html2 += '<div id="player2">';
  html2 += '</div>';
  html2 += '</div>';
  document.getElementById('board').innerHTML = html;
  document.getElementById('right-panel').innerHTML = html2;
}
