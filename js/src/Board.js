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
  this.grid = [];
  this.exit = {};
  this.positionExit = "";
  this.potentialExit = this._generatePotentialExit();
  this.interiorWalls = [];
  this.breakableWalls = [];
  this.partition = this.array.length ** 2 +20;
  this.rooms = [];
  this.maximumCapacity = 20;
  this.maxTries = 0;
  this.hallExit = {};
  this.hallCoord = {};
  this.maxTime = 0;
};

Board.prototype.updateGrid = function() {
  for (var i = 0; i < this.array.length; i++ ) {
    this.grid[i] = [];
    for (var j = 0; j < this.array[i].length; j++ ) {
      if (this.array[i][j].type == "room" || this.array[i][j].isOpen === true) {
        this.grid[i][j] = 1;
      } else {
        this.grid[i][j] = 0;
      }
    }
  }
};

Board.prototype._calculateSettings = function() {
  if (this.array.length === 7) {
    this.maxTime = 5;
    this.maxTries = 3;
  } else {
    this.maxTime = 10;
    this.maxTries = 6;
  }
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

Board.prototype._generateBreakableWalls = function() {
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

Board.prototype._restartBoard = function() {
  for (var i = 0; i < this.array.length; i++) {
    for (var j = 0; j < this.array[i].length; j++) {
      if (!this._isRoom(i, j)) {
        this.array[i][j].canBreak = false;
        this.array[i][j].isExit = false;
        this.array[i][j].isOpen = false;
      }
    }
  }
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
      this.hallCoord = {
        row: 1,
        col: this._middleCell()
      };
      this.array[1][this._middleCell()-1].canBreak = true;
      break;
    case "right":
      this.hallExit = this.array[this._middleCell()][this._lastCell() - 1];
      this.hallCoord = {
        row: this._middleCell(),
        col: this._lastCell() - 1
      };
      this.array[this._middleCell()-1][this._lastCell() - 1].canBreak = true;
      break;
    case "down":
      this.hallExit = this.array[this._lastCell() - 1][this._middleCell()];
      this.hallCoord = {
        row: this._lastCell() - 1,
        col: this._middleCell()
      };
      this.array[this._lastCell() - 1][this._middleCell()+1].canBreak = true;
      break;
    case "left":
      this.hallExit = this.array[this._middleCell()][1];
      this.hallCoord = {
        row: this._middleCell(),
        col: 1
      };
      this.array[this._middleCell()+1][1].canBreak = true;
      break;
  }
};

Board.prototype._isRoom = function() {
  for (var c = 0; c < this.array.length; c++) {
    for (var d = 0; d < this.array[c].length; d++) {
      if (this.array[c][d].type === "room") {
        return true;
      } else {
        return false;
      }
    }
  }
};

Board.prototype._fillRooms = function() {
  for (var a = 1; a < this.array.length - 1; a++) {
    for (var b = 1; b < this.array[a].length - 1; b++) {
      if (this.array[a][b].type === "room") {
        this.rooms.push(this.array[a][b]);
      }
    }
  }
  var randomQuantities = [];
  for (var z = 0; z < this.rooms.length; z++) {
    var quantity = (Math.floor(Math.random() * this.maximumCapacity) + 1);
    randomQuantities.push(quantity);
  }
  for (var t = 0; t < this.rooms.length; t++) {
    this.rooms[t].numberPeople = randomQuantities[t];
  }
  this.hallExit.numberPeople = 0;
};

Board.prototype.printQuantityPeople = function() {
  for (var i = 1; i < this.array.length - 1; i += 2) {
    for (var j = 1; j < this.array[i].length - 1; j += 2) {
      if (this.array[i][j].numberPeople !== 0) {
        $("#" + i + "-" + j).html(this.array[i][j].numberPeople);
      } else {
        $("#" + i + "-" + j).empty();
      }
    }
  }
};

Board.prototype.horMove = function(row, col) {
  if (row < this.exit.row) {
    this.array[row + 1][col].numberPeople += this.array[row - 1][col].numberPeople;
    this.array[row - 1][col].numberPeople = 0;
    return "down";
  } else {
    this.array[row - 1][col].numberPeople += this.array[row + 1][col].numberPeople;
    this.array[row + 1][col].numberPeople = 0;
    return "up";
  }
};

Board.prototype.verMove = function(row, col) {
  if (col < this.exit.col) {
    this.array[row][col + 1].numberPeople += this.array[row][col - 1].numberPeople;
    this.array[row][col - 1].numberPeople = 0;
    return "right";
  } else {
    this.array[row][col - 1].numberPeople += this.array[row][col + 1].numberPeople;
    this.array[row][col + 1].numberPeople = 0;
    return "left";
  }
};

Board.prototype.start = function() {
  this._isRoom();
  this._restartBoard();
  this._generateBreakableWalls();
  this._randomExit();
  this._generateHall();
  this._fillRooms();
  this._calculateSettings();
};
