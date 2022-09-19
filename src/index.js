import { createGameboard, placeShip } from './gameboard-factory';
import Player from './player';

const body = document.querySelector('body');

let player;
let gameboard;

function startGame(name) {
  // create player gameboard
  gameboard = createGameboard();
  // function that lets player place ships
  player = new Player(name);
  player.placePlayerShips(gameboard);
  // create computer gameboard
  // function that has computer place ships randomly
}

body.onload = startGame('player');
