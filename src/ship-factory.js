class Ship {
  constructor(length) {
    this.length = length;
    this.health = length;
    this.hitLocation = null;
    this.spaces = {};
    this.sunk = false;
    this.createSpaces(length);
  }

  // takes a number and then marks that space as ‘hit’
  hit(n) {
    this.spaces[n] = true;
    this.hitLocation = n;
    this.health--;
    this.isSunk();
  }

  // changes sink value
  isSunk() {
    if (this.health === 0) {
      this.sunk = true;
    }
  }

  // creates spaces that can be hit
  createSpaces(length) {
    for (let i = 0; i < length; i++) {
      this.spaces[i] = false;
    }
  }
}

// test ship
const newShip = new Ship(3);

exports.Ship = Ship;
exports.newShip = newShip;
