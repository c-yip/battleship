class Ship {
  constructor(length, hitLocation) {
    this.length = length;
    this.hitLocation = hitLocation;
    this.sunk = false;
  }

  hit() {
    // takes a number and then marks that position as ‘hit’
  }

  isSunk() {
    // calculates based on ship's length and whether all of its positions are ‘hit’
  }
}
