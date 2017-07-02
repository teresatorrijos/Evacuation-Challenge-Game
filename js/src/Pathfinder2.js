




var grid = [];
for (var i = 0; i < plan2.length; i++ ) {
  grid[i] = [];
  for (var j = 0; j < plan2[i].length; j++ ) {
    if (plan2[i][j].type == "room" || plan2[i][j].isOpen === true) {
      grid[i][j] = 1;
    } else {
      grid[i][j] = 0;
    }
  }
}


console.table (grid);


// var graph = new Graph ([
//
// ])
