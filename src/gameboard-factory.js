// Gameboards should be able to place ships at specific coordinates
// by calling the ship factory function.
// Gameboards should have a receiveAttack function that takes a pair of coordinates,
// determines whether or not the attack hit a ship and then sends the ‘hit’ function
// to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.

class BoardPiece {
  constructor() {
    this.hit = false;
    this.miss = false;
    this.occupied = false;
    this.x = 0;
    this.y = 0;
    this.idCounter();
  }

  idCounter() {
    this.x++;
    this.y++;
  }

  addShip() {
    // adds ship piece to board piece
  }

  receiveAttack() {
    // board piece receives attack

    // board piece changes hit or miss boolean

    // adds one to hit count if hit
  }
}

function createGameboard() {
  const arr = [];

  // board size
  const a = 7;
  const b = 7;

  // creating two dimensional array
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i] = [];
    }
  }

  // inserting elements to array
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i][j] = new BoardPiece();
    }
  }

  return arr;
}

let hitCount;
function checkIfAllShipsSunk() {
  // checks hit count and if hit count hits limit then game over
}

console.log(createGameboard());
