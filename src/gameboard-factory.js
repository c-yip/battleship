// Gameboards should be able to place ships at specific coordinates
// by calling the ship factory function.
// Gameboards should have a receiveAttack function that takes a pair of coordinates,
// determines whether or not the attack hit a ship and then sends the ‘hit’ function
// to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.

import { Ship } from './ship-factory';

export class BoardPiece {
  constructor(x, y) {
    this.hit = false;
    this.miss = false;
    this.occupied = false;
    this.x = x;
    this.y = y;
    this.shipId = null;
  }

  receiveAttack() {
    this.hit = true;
  }
}

function getBoardPiece(gameboard, index, x, y, newShip) {
  const boardPiece = gameboard[index].find((obj) => obj.x === x && obj.y === y);
  boardPiece.occupied = true;
  boardPiece.shipId = newShip.id;
}

export const shipArray = [];
export function placeShip(length, id, gameboard, index, x, y, isHorizontal) {
  // create ship
  const newShip = new Ship(length, id);
  shipArray.push(newShip);
  // place ship in boardgame objects, link boardgame objects to the new ship through shipId
  if (isHorizontal) {
    for (let i = 0; i < length; i++) {
      // y increases based on length, placement is right to left
      getBoardPiece(gameboard, index, x, y, newShip);
      y++;
    }
  } else {
    for (let i = 0; i < length; i++) {
      // x and index increase to go vertical
      getBoardPiece(gameboard, index++, x, y, newShip);
      x++;
    }
  }
}

export function createGameboard() {
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
      arr[i][j] = new BoardPiece(i, j);
    }
  }

  return arr;
}

let hitCount;
function checkIfAllShipsSunk() {
  // checks hit count and if hit count hits limit then game over
}

export function attack(piece, ship) {
  piece.receiveAttack();
  // ship gets hit and loses health
  ship.hit();
}

export function getOccupiedPieces(gameboard) {
  const merged = [].concat(...gameboard);
  const occupiedPieces = merged.filter((pieces) => pieces.occupied === true);
  return occupiedPieces;
}

// test board piece
export const testPiece = new BoardPiece(0, 0);
testPiece.occupied = true;
