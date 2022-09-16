import { createGameboard, placeShip } from './gameboard-factory';

const gameboard = createGameboard();

placeShip(3, 0, gameboard, 0, 0, 1);

console.log('board', gameboard);

// const object = gameboard[0].find((obj) => obj.x === 0 && obj.y === 0);
// console.log(object);
// const newShip = object.placeShip(3);
// console.log(newShip, object);

// export function placeShip(length, id, gameboard, index, x, y) {
//   // create ship
//   const newShip = new Ship(length, id);
//   // place ship in boardgame objects
//   for (i = 0; i < length; i++) {
//     getBoardPiece(gameboard, index, x, y, newShip);
//   }
//   // link boardgame objects to the new ship
// }
