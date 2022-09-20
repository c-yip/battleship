import { Ship, hit } from './ship-factory';
import Player from './player';

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

// place Player.ship on gameboard and update gameboard, x is vertical, y is horizontal
export function placeShip(ship, gameboard, selectedPiece, position) {
  const { length } = ship;
  const { id } = ship;
  selectedPiece.occupied = true;
  selectedPiece.shipId = id;

  if (position === 'horizontal') {
    for (let i = 1; i < length; i += 1) {
      const nextPiece = gameboard[selectedPiece.x + i][selectedPiece.y];
      nextPiece.occupied = true;
      nextPiece.shipId = id;
    }
  }

  if (position === 'vertical') {
    for (let i = 1; i < length; i += 1) {
      const nextPiece = gameboard[selectedPiece.x][selectedPiece.y + i];
      nextPiece.occupied = true;
      nextPiece.shipId = id;
    }
  }
}

export function createGameboard(board) {
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

  // create 7x7 gameboard in DOM
  if (board == 'player') {
    const gameboard = document.querySelector('.gameboard');
    for (let i = 0; i < a; i++) {
      for (let j = 0; j < b; j++) {
        const div = document.createElement('div');
        div.classList.add('board-piece');
        div.setAttribute('data-x', i);
        div.setAttribute('data-y', j);
        gameboard.appendChild(div);
      }
    }
  } else {
    const gameboard = document.querySelector('.computer-gameboard');
    for (let i = 0; i < a; i++) {
      for (let j = 0; j < b; j++) {
        const div = document.createElement('div');
        div.classList.add('board-piece');
        div.setAttribute('data-x', i);
        div.setAttribute('data-y', j);
        gameboard.appendChild(div);
      }
    }
  }

  return arr;
}

let hitCount;
function checkIfAllShipsSunk() {
  // checks hit count and if hit count hits limit then game over
}

export function attack(piece, shipArray) {
  let ship;
  piece.receiveAttack();
  const { shipId } = piece;
  // if piece is occupied ship gets hit and loses health
  if (piece.occupied === true) {
  // get ship that is on piece
    ship = shipArray.filter((s) => s.id === shipId);
    console.log(ship);
    hit(ship[0]);
    return ship[0];
  }
  piece.miss = true;
  console.log(ship);
}

export function getOccupiedPieces(gameboard) {
  const merged = [].concat(...gameboard);
  const occupiedPieces = merged.filter((pieces) => pieces.occupied === true);
  return occupiedPieces;
}

// test board piece
export const testPiece = new BoardPiece(0, 0);
testPiece.occupied = true;

// test gameboard
export const testGameboard = function () {
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
};
