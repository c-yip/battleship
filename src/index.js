import { createGameboard, computerShipPlacement } from './gameboard-factory';
import Player from './player';

const body = document.querySelector('body');
const startButton = document.querySelector('.start-game-button');
const compGB = document.querySelector('.computer-gameboard');

let player;
let playerGameboard;
let computerGameboard;
let playerShips = [];
let computerShips = [];
const name = 'Test Player';

function startGame(name) {
  // create player gameboard
  playerGameboard = createGameboard('player');
  // function that lets player place ships
  player = new Player(name);
  playerShips = player.placePlayerShips(playerGameboard);
  // create computer gameboard
  computerGameboard = createGameboard('computer');
  // function that has computer place ships randomly
  computerShips = computerShipPlacement(computerGameboard);

  // temporary color for computer occupied pieces
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

startButton.addEventListener('click', startGameLoop);

function startGameLoop() {
  console.log('game loop started');
  console.log('computer gameboard', computerGameboard);
  console.log('player gameboard', playerGameboard);
  console.log('computer ships', computerShips);
  console.log('player ships', playerShips);

  // allow player to attack computer gameboard and computer to attack player gameboard
  computerGameboard.forEach((row) => {
    row.forEach((piece) => {
      const element = compGB.querySelector(
        `[data-x="${piece.x}"][data-y="${piece.y}"]`,
      );
      element.addEventListener('click', (event) => {
        console.log('clicked');
        console.log('piece', piece);
        console.log('piece.occupied', piece.occupied);
        if (piece.occupied) {
          console.log('hit');
          element.classList.add('hit');
        } else {
          console.log('miss');
          element.classList.add('miss');
        }

        // after click, computer attacks player gameboard
        // computer chooses random piece
        const randomX = Math.floor(Math.random() * 7);
        const randomY = Math.floor(Math.random() * 7);
        const randomPiece = playerGameboard[randomX][randomY];
        console.log('random piece', randomPiece);
        console.log('random piece.occupied', randomPiece.occupied);
        // get player gameboard piece elements
        const playerGB = document.querySelector('.gameboard');
        const playerPiece = playerGB.querySelector(
          `[data-x="${randomPiece.x}"][data-y="${randomPiece.y}"]`,
        );
        if (randomPiece.occupied) {
          console.log('hit');
          playerPiece.classList.add('hit');
        } else {
          console.log('miss');
          playerPiece.classList.add('miss');
        }
      });
    });
  });
}

body.onload = startGame(name);
