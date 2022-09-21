import { Ship } from './ship-factory';

let shipPlaced = false;
let shipCount = 0;
const controller = new AbortController();

// increment ship count
function incrementShipCount() {
  if (shipPlaced) {
    shipCount++;
    return shipCount;
  }
}

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

  placePlayerShips(gameboard) {
    let position = 'vertical';
    document.querySelector('.toggle-button').addEventListener('click', () => {
      if (position === 'vertical') {
        position = 'horizontal';
      } else {
        position = 'vertical';
      }
    });

    document.querySelectorAll('.board-piece').forEach((piece) => {
      piece.addEventListener('click', () => {
        // get x and y coordinates of element to get selectedPiece from gameboard
        const x = piece.getAttribute('data-x');
        const y = piece.getAttribute('data-y');
        console.log(`x: ${x}, y: ${y}`);
        const selectedPiece = gameboard[x][y];
        console.log(selectedPiece);

        // place playerShips on gameboard
        placeShip(this.playerShips[shipCount], gameboard, selectedPiece, position);
        changeColorOfOccupiedPieces(gameboard);
        incrementShipCount();
        console.log('ship count: ', shipCount);

        // check if all ships are placed and remove all event listeners
        if (shipCount === 5) {
          console.log('test if triggered');
          // remove event listeners
          controller.abort();
        }
      }, { signal: controller.signal });

      // mouseover event to add hover effect
      piece.addEventListener('mouseover', (event) => {
        event.target.classList.add('hover');
        const x = piece.getAttribute('data-x');
        const y = piece.getAttribute('data-y');
        for (let i = 1; i < this.playerShips[shipCount].length; i++) {
          if (position === 'horizontal') {
            const nextPiece = document.querySelector(`[data-x="${x}"][data-y="${Number(y) + i}"]`);
            nextPiece.classList.add('hover');
          } else {
            const nextPiece = document.querySelector(`[data-x="${Number(x) + i}"][data-y="${y}"]`);
            nextPiece.classList.add('hover');
          }
        }
      }, { signal: controller.signal });
      piece.addEventListener('mouseout', (event) => {
        event.target.classList.remove('hover');
        const x = piece.getAttribute('data-x');
        const y = piece.getAttribute('data-y');
        for (let i = 1; i < this.playerShips[shipCount].length; i++) {
          if (position === 'horizontal') {
            const nextPiece = document.querySelector(`[data-x="${x}"][data-y="${Number(y) + i}"]`);
            nextPiece.classList.remove('hover');
          } else {
            const nextPiece = document.querySelector(`[data-x="${Number(x) + i}"][data-y="${y}"]`);
            nextPiece.classList.remove('hover');
          }
        }
      }, { signal: controller.signal });
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

export function placeShip(ship, gameboard, selectedPiece, position) {
  const { length } = ship;
  const { id } = ship;

  if (position === 'vertical') {
    if (selectedPiece.x + ship.length > 7
      || gameboard[selectedPiece.x + ship.length - 1][selectedPiece.y].occupied
      || selectedPiece.occupied === true) {
      shipPlaced = false;
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
    shipPlaced = true;
  }

  if (position === 'horizontal') {
    if (selectedPiece.y + ship.length > 7
      || gameboard[selectedPiece.x][selectedPiece.y + ship.length - 1].occupied
      || selectedPiece.occupied === true) {
      shipPlaced = false;
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
    shipPlaced = true;
  }
}
