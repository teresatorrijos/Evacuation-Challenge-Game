var Room = function() {
  this.type = "room";
  this.numberPeople= 0;
};
var Wall = function() {
  this.type= "wall";
  this.canBreak= false;
  this.isExit= false;
};

var Board = function() {
  this.array = [
    [new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall()],
    [new Wall(), new Room(), new Wall(), new Room(), new Wall(), new Room(), new Wall()],
    [new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall()],
    [new Wall(), new Room(), new Wall(), new Room(), new Wall(), new Room(), new Wall()],
    [new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall()],
    [new Wall(), new Room(), new Wall(), new Room(), new Wall(), new Room(), new Wall()],
    [new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall()],
  ];
  this.potentialExit = [this.array[0][3], this.array[3][6], this.array[6][3], this.array[3][0]];
  this.interiorWalls = [];
  this.breakableWalls = [];
  this.partition = 12;
  this.rooms = [];
  this.maximunCapacity = 20;
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
  } console.log(this.breakableWalls);
};

Board.prototype.randomExit = function() {
  var randomIndex = Math.floor(Math.random() * this.potentialExit.length);
  this.potentialExit[randomIndex].isExit = true;
  console.log(this.potentialExit[randomIndex]);
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

function printQuantityPeople() {
  $("quantity-people").html(this.rooms.numberPeople);
}

Board.prototype.start = function() {
  this.randomReleaseWalls();
  this.randomExit();
  this.fillRooms();
};

var board = new Board();
board.start();
