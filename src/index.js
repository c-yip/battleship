import {
  createGameboard,
  computerShipPlacement,
  attack,
} from "./gameboard-factory";
import Player from "./player";

const body = document.querySelector("body");
const startButton = document.querySelector(".start-game-button");
const compGB = document.querySelector(".computer-gameboard");

let player;
let playerGameboard;
let computerGameboard;
let playerShips = [];
let computerShips = [];
const name = "Test Player";
let playerScore = 0;
let computerScore = 0;
let gameEnd = false;
const controller = new AbortController();

function startGame(name) {
  // create player gameboard
  playerGameboard = createGameboard("player");
  // function that lets player place ships
  player = new Player(name);
  playerShips = player.placePlayerShips(playerGameboard);
  // create computer gameboard
  computerGameboard = createGameboard("computer");
  // function that has computer place ships randomly
  computerShips = computerShipPlacement(computerGameboard);
}

// end game message and restart button
function endGame(playerWin) {
  gameEnd = true;
  document.querySelector(".score-board").style.visibility = "hidden";
  const endGameModal = document.querySelector(".end-game-modal");
  const modalTitle = document.querySelector(".modal-title");
  endGameModal.style.display = "block";
  playerWin
    ? (modalTitle.textContent = "You Win!")
    : (modalTitle.textContent = "You Lose!");

  const restartButton = document.querySelector(".restart-game-button");
  restartButton.addEventListener("click", () => {
    location.reload();
  });
}

startButton.addEventListener("click", startGameLoop);

function startGameLoop() {
  startButton.style.visibility = "hidden";

  // allow player to attack computer gameboard and computer to attack player gameboard
  computerGameboard.forEach((row) => {
    row.forEach((piece) => {
      const element = compGB.querySelector(
        `[data-x="${piece.x}"][data-y="${piece.y}"]`
      );
      element.addEventListener(
        "click",
        (event) => {
          // attack computer gameboard
          attack(piece, computerShips);

          // change color of piece
          if (piece.occupied) {
            element.classList.add("hit");
            playerScore++;
          } else {
            element.classList.add("miss");
          }

          // after click, computer attacks player gameboard
          // computer chooses random piece

          function getRandomPiece() {
            const randomX = Math.floor(Math.random() * 7);
            const randomY = Math.floor(Math.random() * 7);
            const pickedPiece = playerGameboard[randomX][randomY];
            if (pickedPiece.hit || pickedPiece.miss) {
              return getRandomPiece();
            }
            return pickedPiece;
          }

          const randomPiece = getRandomPiece();
          // get player gameboard piece elements
          const playerGB = document.querySelector(".gameboard");
          const playerPiece = playerGB.querySelector(
            `[data-x="${randomPiece.x}"][data-y="${randomPiece.y}"]`
          );

          // attack selected piece
          attack(randomPiece, playerShips);

          // change color of piece
          if (randomPiece.occupied) {
            playerPiece.classList.add("hit");
            computerScore++;
          } else {
            playerPiece.classList.add("miss");
          }

          document.querySelector(
            ".player-score"
          ).textContent = `Player Score: ${playerScore}`;
          document.querySelector(
            ".computer-score"
          ).textContent = `Computer Score: ${computerScore}`;

          // check if game is over
          // check if computer ships are all sunk
          const computerShipsSunk = computerShips.filter(
            (s) => s.sunk === true
          );

          if (computerShipsSunk.length === 5) {
            endGame(true);
          }
          // check if player ships are all sunk
          const playerShipsSunk = playerShips.filter((s) => s.sunk === true);
          if (playerShipsSunk.length === 5) {
            endGame(false);
          }
          if (gameEnd) controller.abort();
        },
        { once: true, signal: controller.signal }
      );
    });
  });
}

body.onload = startGame(name);
