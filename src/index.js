import { createGameboard, placeShip } from './gameboard-factory';

const gameboard = createGameboard();

placeShip(length: 3, id: 0, board: gameboard, index: 0, x: 0, y:1, isHorizontal: true);
placeShip(4, 1, gameboard, 1, 1, 0, false);

console.table('board', gameboard);
