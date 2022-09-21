import { createGameboard, computerShipPlacement } from './gameboard-factory';
import Player from './player';

const body = document.querySelector('body');

let player;
let playerGameboard;
let computerGameboard;
const name = 'Test Player';

function startGame(name) {
  // create player gameboard
  playerGameboard = createGameboard('player');
  // function that lets player place ships
  player = new Player(name);
  player.placePlayerShips(playerGameboard);
  // create computer gameboard
  computerGameboard = createGameboard('computer');
  // function that has computer place ships randomly
  computerShipPlacement(computerGameboard);

  // temporary color for computer occupied pieces
  const compGB = document.querySelector('.computer-gameboard');
  computerGameboard.forEach((row) => {
    row.forEach((piece) => {
      if (piece.occupied) {
        const element = compGB.querySelector(
          `[data-x="${piece.x}"][data-y="${piece.y}"]`,
        );
        element.classList.add('occupied');
      }
    });
  });
}

body.onload = startGame(name);

console.log(player);
console.log('player', playerGameboard);
console.log(computerGameboard);
