import { placeShip } from './gameboard-factory';
import { Ship } from './ship-factory';

export default class Player {
  constructor(name) {
    this.name = name;
    this.playerShips = [];
    this.createPlayerShips();
  }

  // creates player ships
  createPlayerShips() {
    const carrier = new Ship(5, 1);
    const battleship = new Ship(4, 2);
    const cruiser = new Ship(3, 3);
    const submarine = new Ship(3, 4);
    const patrolBoat = new Ship(2, 5);
    this.playerShips.push(carrier, battleship, cruiser, submarine, patrolBoat);
  }

  // player uses placeShip function to place this.playerShips on gameboard on click
  placePlayerShips(gameboard, position) {
    document.querySelectorAll('.board-piece').forEach((piece) => {
      // set position
      // event listener that toggles position

      piece.addEventListener('click', () => {
        // get x and y coordinates of element to get selectedPiece from gameboard
        const x = piece.getAttribute('data-x');
        const y = piece.getAttribute('data-y');
        console.log(`x: ${x}, y: ${y}`);
        const selectedPiece = gameboard[x][y];
        // place ship on gameboard
        placeShip(this.playerShips[0], gameboard, selectedPiece, position);
        // placeShip(this.playerShips[1], gameboard, selectedPiece, position);
        // placeShip(this.playerShips[2], gameboard, selectedPiece, position);

        // change color of occupied pieces
        gameboard.forEach((row) => {
          row.forEach((piece) => {
            if (piece.occupied) {
              const element = document.querySelector(
                `[data-x="${piece.x}"][data-y="${piece.y}"]`,
              );
              element.classList.add('occupied');
            }
          });
        });

        console.log('gameboard after click', gameboard);
      });
    });
  }
}
