var Room = function() {
  this.type = "room";
  this.numberPeople = 0;
};
var Wall = function() {
  this.type = "wall";
  this.canBreak = false;
  this.isExit = false;
};

var Board = function(plan) {
  this.array = plan;
  this.exit = {};
  this.potentialExit = [this.array[0][(this.array.length-1)/2], this.array[(this.array.length-1)/2][this.array.length-1], this.array[this.array.length-1][(this.array.length-1)/2], this.array[(this.array.length-1)/2][0]];
  this.interiorWalls = [];
  this.breakableWalls = [];
  this.partition = 15;
  this.rooms = [];
  this.maximunCapacity = 20;
  this.exit = {};
};

Board.prototype.randomReleaseWalls = function() {
  for (var i = 1; i < this.array.length - 1; i++) {
    for (var j = 1; j < this.array[i].length - 1; j++) {
      if (this.array[i][j].type === "wall") {
        this.interiorWalls.push(this.array[i][j]);
      }
    }
  }
  for (var x = 0; x < this.partition; x++) {
    var randomIndex = Math.floor(Math.random() * this.interiorWalls.length);
    this.breakableWalls.push(this.interiorWalls[randomIndex]);
  }
  for (var y = 0; y < this.breakableWalls.length; y++) {
    this.breakableWalls[y].canBreak = true;
  }
};

Board.prototype.randomExit = function() {
  var randomIndex = Math.floor(Math.random() * this.potentialExit.length);
  this.potentialExit[randomIndex].isExit = true;
  var exitCoordinates = [{row : 0, col: (this.array.length-1)/2}, {row : (this.array.length-1)/2, col : this.array.length-1}, {row : this.array.length-1, col : (this.array.length-1)/2}, {row : (this.array.length-1)/2, col : 0}];
  this.exit = exitCoordinates[randomIndex];
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
};

Board.prototype.printQuantityPeople = function() {
  // var numbers = [];
  // var quantities = document.getElementsByClassName("quantity-people");
  // for(var i=0; i<this.rooms.length; i++) {
  //   numbers.push(quantities[i].numberPeople);
  // }
  //
  // $("quantity-people").html(this.rooms[i].numberPeople);
};

Board.prototype.start = function() {
  this.randomReleaseWalls();
  this.randomExit();
  this.fillRooms();
};
