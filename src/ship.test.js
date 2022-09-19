import { newShip } from './ship-factory';
import {
  BoardPiece, testPiece, createGameboard, placeShip, attack, shipArray, getOccupiedPieces,
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

test('attack received by board and ship', () => {
  const gameboard = createGameboard();
  placeShip(3, 0, gameboard, 0, 0, 1, true);
  const boardPiece = gameboard[0][1];
  const ship = shipArray[0];
  attack(boardPiece, ship);
  expect(boardPiece.hit).toBe(true);
  expect(ship.health).toBe(2);
});

test('ship sinks after three attacks', () => {
  const gameboard = createGameboard();
  placeShip(3, 0, gameboard, 0, 0, 1, true);
  const occupiedPieces = getOccupiedPieces(gameboard);
  console.log('occupied pieces', occupiedPieces);
  const boardPiece = gameboard[0][1];
  const ship = shipArray[0];
  attack(boardPiece, ship);
  expect(boardPiece.hit).toBe(true);
  expect(ship.health).toBe(2);
});
