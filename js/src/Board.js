var R = {
  type: "room",
  numberPeople: 0
};
var W = {
  type: "wall",
  canBreak: true,
  isExit: false
};

var Board = function() {
  this.array = [
    [W, W, W, W, W, W, W],
    [W, R, W, R, W, R, W],
    [W, W, W, W, W, W, W],
    [W, R, W, R, W, R, W],
    [W, W, W, W, W, W, W],
    [W, R, W, R, W, R, W],
    [W, W, W, W, W, W, W],
  ];
  this.potentialExit = [this.array[0][3], this.array[3][6], this.array[6][3], this.array[3][0]];
  this.perimeter = [];
  this.interiorWalls = [];
  this.unbreakableWalls = [];
  this.loadBearingWalls = 4;
  this.rooms = [];
  this.maximunCapacity = 20;
};


Board.prototype.freezePerimeter = function() {
  for (var j = 0; j < this.array.length; j += this.array.length - 1) {
    for (var i = 0; i < this.array[j].length; i++) {
      this.perimeter.push(this.array[j][i]);
      this.perimeter.push(this.array[i][j]);
    }
  }
  for (var x = 0; x < this.perimeter.length; x++) {
    this.perimeter[x].canBreak = false;
  }
};

Board.prototype.randomFreezeWalls = function() {
  for (var i = 1; i < this.array.length - 1; i++) {
    for (var j = 1; j < this.array[i].length - 1; j++) {
      if (this.array[i][j].type === "wall") {
        this.interiorWalls.push(this.array[i][j]);
      }
    }
  }
  for (var x = 0; x < this.loadBearingWalls; x++) {
    var randomIndex = Math.floor(Math.random() * this.interiorWalls.length);
    this.unbreakableWalls.push(this.interiorWalls[randomIndex]);
  }
  for (var y = 0; y < this.unbreakableWalls.length; y++) {
    this.unbreakableWalls[y].canBreak = false;
  }
};

Board.prototype.randomExit = function() {
  var randomIndex = Math.floor(Math.random() * this.potentialExit.length);
  this.potentialExit[randomIndex].isExit = true;
};

Board.prototype.fillRooms = function() {
  for (var i = 1; i < this.array.length - 1; i++) {
    for (var j = 1; j < this.array[i].length - 1; j++) {
      if (this.array[i][j].type === "room") {
        this.rooms.push(this.array[i][j]);
      }
    }
  }
  var randomQuantities = [];
  for (var x=0; x<this.rooms.length; x++) {
    var quantity = Math.floor(Math.random() * this.maximunCapacity);
    randomQuantities.push(quantity);
  }
  for (var y=0; y<this.rooms.length; y++) {
    this.rooms[y].numberPeople = randomQuantities[y];
  }
  console.log(randomQuantities);
  console.log(this.rooms);
};

Board.prototype.start = function() {
  this.randomFreezeWalls();
  this.freezePerimeter();
  this.randomExit();
  this.fillRooms();
};

// var board = new Board();
// board.fillRooms();
