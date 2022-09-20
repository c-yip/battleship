import { createGameboard, placeShip } from './gameboard-factory';
import Player from './player';

const body = document.querySelector('body');

let player;
let playerGameboard;
let computerGameboard;
const name = 'Test Player';
const position = 'horizontal';
function startGame(name) {
  // create player gameboard
  playerGameboard = createGameboard('player');
  // function that lets player place ships
  player = new Player(name);
  player.placePlayerShips(playerGameboard, position);
  // create computer gameboard
  computerGameboard = createGameboard('computer');
  // function that has computer place ships randomly
}

body.onload = startGame(name);

console.log(player);
console.log('player', playerGameboard);
console.log(computerGameboard);
