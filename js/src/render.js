
function renderBoard(plan) {
  var html = '';
  var html2 = '';
  for (var i = 0; i < plan.array.length - 1; i += 2) {
    html += '<div class= "row-wall">';
    for (var j = 0; j < plan.array[i].length - 1; j += 2) {
      html += '<div class= "square">';
      html += '</div>';
      if (plan.array[i][j].canBreak === true) {
        html += '<div class= "horizontal-breakable" row=' + i + ' col=' + (j + 1) + '>';
        html += '<div class= "horizontal-partition">';
        html += '</div>';
        html += '</div>';
      } else if (plan.array[i][j + 1].isExit === true) {
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
    for (var x = 0; x < plan.array[i].length - 1; x += 2) {
      if (plan.array[i + 1][x].canBreak === true) {
        html += '<div class= "vertical-breakable" row=' + (i + 1) + ' col=' + x + '>';
        html += '<div class= "vertical-partition">';
        html += '</div>';
        html += '</div>';
      } else if (plan.array[i + 1][x].isExit === true) {
        html += '<div class= "vertical-exit">';
        html += '</div>';
      } else {
        html += '<div class= "vertical-wall">';
        html += '</div>';
      }
      html += '<div class= "room">';
      html += '<div class= "quantity-people" id="' + (i + 1) +'-'+ (x +1) + '">';
      if (plan.array[i + 1][x + 1].numberPeople !== 0){
      html += plan.array[i + 1][x + 1].numberPeople;}
      html += '</div>';
      html += '</div>';
    }
    if (plan.array[i + 1][plan.array.length - 1].isExit === true) {
      html += '<div class= "vertical-exit">';
      html += '</div>';
    } else {
      html += '<div class= "vertical-wall">';
      html += '</div>';
    }
    html += '</div>';
  }
  html += '<div class= "row-wall">';
  for (var y = 0; y < plan.array[(plan.array.length - 1)].length - 1; y += 2) {
    html += '<div class= "square">';
    html += '</div>';
    if (plan.array[(plan.array.length - 1)][y + 1].isExit === true) {
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

function renderInitialScreen() {
  var initial = $("<div></div>").text("Choose a level to start").addClass("initial-screen");
  $("#right-panel").append(initial);
  $(".initial-screen").append("<button id='level1'> Level 1 </button>");
  $(".initial-screen").append("<button id='level2'> Level 2 </button>");
  var gif = $("<div></div>").text("").addClass("gif-box");
  $("#board").append(gif);
  $(".gif-box").append("<img id='gif' src='img/gif-juego.gif'> </img>");
}
