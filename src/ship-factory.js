class Ship {
  constructor(length) {
    this.length = length;
    this.health = 3;
    this.hitLocation = null;
    this.spaces = {};
    this.sunk = false;
    this.createSpaces(length);
  }

  hit(n) {
    // takes a number and then marks that space as ‘hit’
    this.spaces[n] = true;
  }

  isSunk() {
    if (this.health === 0) {
      this.sunk = true;
    }
  }

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
