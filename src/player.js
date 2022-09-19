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

  // player uses placeShip function to place ships on gameboard
  placePlayerShips(gameboard) {
    document.querySelectorAll('.board-piece').forEach((piece) => {
      piece.addEventListener('click', () => {
        const x = piece.getAttribute('data-x');
        const y = piece.getAttribute('data-y');
        console.log(`x: ${x}, y: ${y}`);

        // // place ship on gameboard
        // placeShip(length, id, gameboard, index, x, y, isHorizontal);
      });
    });
  }
}
