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
        console.log(selectedPiece);

        // place playerShips on gameboard
        placeShip(this.playerShips[0], gameboard, selectedPiece, position);
        changeColorOfOccupiedPieces(gameboard);

        // remove event listener
        piece.removeEventListener('click', () => {});
      });
    });
  }
}

function changeColorOfOccupiedPieces(gameboard) {
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
}

function placeShip(ship, gameboard, selectedPiece, position) {
  const { length } = ship;
  const { id } = ship;

  if (position === 'vertical') {
    if (selectedPiece.x + ship.length > 7 || selectedPiece.occupied === true) {
      alert('Ship will not fit on board');
      return;
    }
    selectedPiece.occupied = true;
    selectedPiece.shipId = id;
    for (let i = 1; i < length; i += 1) {
      const nextPiece = gameboard[selectedPiece.x + i][selectedPiece.y];
      nextPiece.occupied = true;
      nextPiece.shipId = id;
    }
  }

  if (position === 'horizontal') {
    if (selectedPiece.y + ship.length > 7
      || gameboard[selectedPiece.x][selectedPiece.y + 1].occupied === true
      || gameboard[selectedPiece.x][selectedPiece.y + 2].occupied === true
      || selectedPiece.occupied === true) {
      alert('Ship will not fit on board');
      return;
    }
    selectedPiece.occupied = true;
    selectedPiece.shipId = id;
    for (let i = 1; i < length; i += 1) {
      const nextPiece = gameboard[selectedPiece.x][selectedPiece.y + i];
      nextPiece.occupied = true;
      nextPiece.shipId = id;
    }
  }
}
