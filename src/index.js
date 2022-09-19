import { createGameboard, placeShip } from './gameboard-factory';

const gameboard = createGameboard();

placeShip(3, 0, gameboard, 0, 0, 1, true);
placeShip(4, 1, gameboard, 1, 1, 0, false);

console.table('board', gameboard);
