import { newShip } from './ship-factory';
import {
  testPiece, createGameboard, placeShip, attack, shipArray, getOccupiedPieces, testGameboard,
} from './gameboard-factory';

test('ship sinks', () => {
  newShip.hit(0);
  newShip.hit(1);
  newShip.hit(2);
  expect(newShip.sunk).toBe(true);
});

test('board piece properties change when receive hit function called', () => {
  testPiece.receiveAttack();
  expect(testPiece.hit).toBe(true);
  expect(testPiece.miss).toBe(false);
});

test('placeShip places ship on gameboard horizontally', () => {
  const gameboard = testGameboard();
  placeShip(newShip, gameboard, gameboard[0][0], 'horizontal');
  expect(gameboard[0][0].occupied).toBe(true);
  expect(gameboard[1][0].occupied).toBe(true);
  expect(gameboard[2][0].occupied).toBe(true);
});

test('placeShip places ship on gameboard vertically', () => {
  const gameboard = testGameboard();
  placeShip(newShip, gameboard, gameboard[0][0], 'vertical');
  expect(gameboard[0][0].occupied).toBe(true);
  expect(gameboard[0][1].occupied).toBe(true);
  expect(gameboard[0][2].occupied).toBe(true);
});

// test('attack received by board and ship', () => {
//   const gameboard = createGameboard('player');
//   const ship = newShip(3, 1);
//   placeShip(ship, gameboard, gameboard[0][0], 'horizontal');
//   const boardPiece = gameboard[0][0];
//   attack(boardPiece);
//   expect(boardPiece.hit).toBe(true);
//   expect(ship.health).toBe(2);
// });

// test('ship sinks after three attacks', () => {
//   const gameboard = createGameboard();
//   placeShip(3, 1, gameboard, 0, 0, 1, true);
//   const occupiedPieces = getOccupiedPieces(gameboard);
//   let ship;
//   occupiedPieces.forEach((piece) => {
//     ship = attack(piece, shipArray);
//   });
//   expect(ship.sunk).toBe(true);
//   expect(ship.health).toBe(0);
// });

// test('piece miss value true after miss', () => {
//   const gameboard = createGameboard();
//   placeShip(3, 2, gameboard, 0, 0, 1, true);
//   const missedPiece = gameboard[1][2];
//   const ship = attack(missedPiece, shipArray);
//   expect(missedPiece.miss).toBe(true);
// });
