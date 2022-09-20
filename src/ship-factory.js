export class Ship {
  constructor(length, id) {
    this.length = length;
    this.health = length;
    this.sunk = false;
    this.id = id;
  }

  // takes a number and then marks that space as ‘hit’
  hit() {
    this.health--;
    this.isSunk();
  }

  // changes sink value
  isSunk() {
    if (this.health === 0) {
      this.sunk = true;
    }
  }
}

export function hit(ship) {
  ship.health--;
  if (ship.health === 0) {
    ship.sunk = true;
  }
  return ship;
}

// test ship
export const newShip = new Ship(3, 0);
