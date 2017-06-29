var Path = function(startArray, endArray, plan){

  this.result = [];
  this.times = 0;

  var grid = [];
  for (var i = 0; i < plan.length; i++ ) {
    grid[i] = [];
    for (var j = 0; j < plan[i].length; j++ ) {
      if (plan.map[i][j].type == "room" || plan.map[i][j].isOpen === true) {
        grid[i][j] = 1;
      } else {
        grid[i][j] = 0;
      }
    }
  }

  var graph = new Graph(grid, false),
  start = graph.grid[startArray[0]][startArray[1]],
  end = graph.grid[endArray[0]][endArray[1]],
  results = [],
  times = 0;

  var nodes = astar.search(graph, start, end);
  nodes.forEach(function(gridNode) {
    results.push([gridNode.x, gridNode.y]);
  });

  return results;
};
