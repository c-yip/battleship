import { newShip, Ship } from './ship-factory';
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
  const gameboardForPlace = testGameboard();
  placeShip(newShip, gameboardForPlace, gameboardForPlace[0][0], 'vertical');
  expect(gameboardForPlace[0][0].occupied).toBe(true);
  expect(gameboardForPlace[0][1].occupied).toBe(true);
  expect(gameboardForPlace[0][2].occupied).toBe(true);
});

test('attack received by board and ship', () => {
  const gameboardForAttack = testGameboard();
  const newShipForAttack = new Ship(3, 0);
  placeShip(newShipForAttack, gameboardForAttack, gameboardForAttack[3][3], 'horizontal');
  attack(gameboardForAttack[3][3], newShipForAttack);
  expect(gameboardForAttack[3][3].hit).toBe(true);
  expect(newShipForAttack.health).toBe(2);
});

test('ship sinks after three attacks', () => {
  const gameboardForSink = testGameboard();
  const shipForSink = new Ship(3, 0);
  placeShip(shipForSink, gameboardForSink, gameboardForSink[3][3], 'horizontal');
  attack(gameboardForSink[3][3], shipForSink);
  attack(gameboardForSink[4][3], shipForSink);
  attack(gameboardForSink[5][3], shipForSink);
  console.log(gameboardForSink);
  console.log(shipForSink);
  expect(shipForSink.sunk).toBe(true);
  expect(shipForSink.health).toBe(0);
});

test('piece miss value true after miss', () => {
  const gameboard = testGameboard();
  const shipForMiss = new Ship(3, 0);
  placeShip(shipForMiss, gameboard, gameboard[3][3], 'horizontal');
  const missedPiece = gameboard[1][2];
  attack(missedPiece, shipForMiss);
  expect(missedPiece.miss).toBe(true);
  expect(shipForMiss.health).toBe(3);
});
