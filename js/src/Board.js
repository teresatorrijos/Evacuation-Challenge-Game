var Room = function() {
  this.type = "room";
  this.numberPeople = 0;
};
var Wall = function() {
  this.type = "wall";
  this.canBreak = false;
  this.isExit = false;
  this.isOpen = false;
};

var Board = function(plan) {
  this.array = plan;
  this.exit = {};
  this.positionExit = "";
  this.potentialExit = this._generatePotentialExit();
  this.interiorWalls = [];
  this.breakableWalls = [];
  this.partition = this.array.length ** 2;
  this.rooms = [];
  this.maximumCapacity = 20;
  this.hallExit = {};
};

Board.prototype._generatePotentialExit = function() {
  return [
    this.array[0][this._middleCell()],
    this.array[this._middleCell()][this._lastCell()],
    this.array[this._lastCell()][this._middleCell()],
    this.array[this._middleCell()][0]
  ];
};
Board.prototype._middleCell = function() {
  return (this.array.length - 1) / 2;
};

Board.prototype._lastCell = function() {
  return this.array.length - 1;
};

Board.prototype._randomReleaseWalls = function() {
  for (var i = 1; i < this.array.length - 1; i++) {
    for (var j = 1; j < this.array[i].length - 1; j++) {
      if (!this._isRoom(i, j)) {
        this.interiorWalls.push(this.array[i][j]);
      }
    }
  }
  for (var x = 0; x < this.partition; x++) {
    var randomIndex = this._randomNumber(this.interiorWalls);
    this.breakableWalls.push(this.interiorWalls[randomIndex]);
  }
  for (var y = 0; y < this.breakableWalls.length; y++) {
    this.breakableWalls[y].canBreak = true;
  }
};

Board.prototype._randomNumber = function(collection) {
  return Math.floor(Math.random() * collection.length);
};

Board.prototype._randomExit = function() {
  var randomIndex = this._randomNumber(this.potentialExit);
  this.potentialExit[randomIndex].isExit = true;
  var exitCoordinates = [{
    row: 0,
    col: this._middleCell()
  }, {
    row: this._middleCell(),
    col: this._lastCell(),
  }, {
    row: this._lastCell(),
    col: this._middleCell()
  }, {
    row: this._middleCell(),
    col: 0
  }];
  this.exit = exitCoordinates[randomIndex];

  switch (randomIndex) {
    case 0:
      this.positionExit = "up";
      break;
    case 1:
      this.positionExit = "right";
      break;
    case 2:
      this.positionExit = "down";
      break;
    case 3:
      this.positionExit = "left";
      break;
  }
};

Board.prototype._generateHall = function() {
  switch (this.positionExit) {
    case "up":
      this.hallExit = this.array[1][this._middleCell()];
      break;
    case "right":
      this.hallExit = this.array[this._middleCell()][this._lastCell() - 1];
      break;
    case "down":
      this.hallExit = this.array[this._lastCell() - 1][this._middleCell()];
      break;
    case "left":
      this.hallExit = this.array[this._middleCell()][1];
      break;
  }
  console.log(this.hallExit);
};

Board.prototype._isRoom = function(i, j) {
  return this.array[i][j].type === "room";
};
Board.prototype.isBreakable = function(i, x) {
  return this.array[i + 1][x].canBreak === true;
};

Board.prototype.getNumberPeople = function(i, x) {
  return this.array[i + 1][x + 1].numberPeople;
};

Board.prototype._fillRooms = function() {
  for (var i = 1; i < this.array.length - 1; i++) {
    for (var j = 1; j < this.array[i].length - 1; j++) {
      if (this._isRoom(i, j)) {
        this.rooms.push(this.array[i][j]);
      }
    }
  }
  var randomQuantities = [];
  for (var x = 0; x < this.rooms.length; x++) {
    var quantity = (Math.floor(Math.random() * this.maximumCapacity) + 1);
    randomQuantities.push(quantity);
  }
  for (var y = 0; y < this.rooms.length; y++) {
    this.rooms[y].numberPeople = randomQuantities[y];
  }
  this.hallExit.numberPeople = 0;
};

Board.prototype.printQuantityPeople = function() {
  for (var i = 1; i < this.array.length - 1; i += 2) {
    for (var j = 1; j < this.array[i].length - 1; j += 2) {
      if (this.array[i][j].numberPeople !==0) {
      $("#" + i + "-" + j).html(this.array[i][j].numberPeople);
    } else {
      $("#" + i + "-" + j).empty();
    }
    }
  }
};

Board.prototype.checkWall = function(row, col) {
};

Board.prototype.horMove = function(row, col) {
  if (row < board.exit.row) {
    board.array[row + 1][col].numberPeople += board.array[row - 1][col].numberPeople;
    board.array[row - 1][col].numberPeople = 0;
    return "down";
  } else {
    board.array[row - 1][col].numberPeople += board.array[row + 1][col].numberPeople;
    board.array[row + 1][col].numberPeople = 0;
    return "up";
  }
};

Board.prototype.verMove = function(row, col) {
  if (col < board.exit.col) {
    board.array[row][col + 1].numberPeople += board.array[row][col - 1].numberPeople;
    board.array[row][col - 1].numberPeople = 0;
    return "right"; //
  } else {
    board.array[row][col - 1].numberPeople += board.array[row][col + 1].numberPeople;
    board.array[row][col + 1].numberPeople = 0;
    return "left";
  }
};

Board.prototype.start = function() {
  this._randomReleaseWalls();
  this._randomExit();
  this._generateHall();
  this._fillRooms();
};
