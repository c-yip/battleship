import { hit, Ship } from './ship-factory';
import { placeShip } from './player';

export class BoardPiece {
  constructor(x, y) {
    this.hit = false;
    this.miss = false;
    this.occupied = false;
    this.x = x;
    this.y = y;
    this.shipId = null;
  }

  receiveAttack() {
    this.hit = true;
  }
}

export function createGameboard(board) {
  const arr = [];
  // board size
  const a = 7;
  const b = 7;

  // creating two dimensional array
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i] = [];
    }
  }

  // inserting elements to array
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i][j] = new BoardPiece(i, j);
    }
  }

  // create 7x7 gameboard in DOM
  if (board == 'player') {
    const gameboard = document.querySelector('.gameboard');
    for (let i = 0; i < a; i++) {
      for (let j = 0; j < b; j++) {
        const div = document.createElement('div');
        div.classList.add('board-piece');
        div.setAttribute('data-x', i);
        div.setAttribute('data-y', j);
        gameboard.appendChild(div);
      }
    }
  } else {
    const gameboard = document.querySelector('.computer-gameboard');
    for (let i = 0; i < a; i++) {
      for (let j = 0; j < b; j++) {
        const div = document.createElement('div');
        div.classList.add('board-piece');
        div.setAttribute('data-x', i);
        div.setAttribute('data-y', j);
        gameboard.appendChild(div);
      }
    }
  }

  return arr;
}

let hitCount;
function checkIfAllShipsSunk() {
  // checks hit count and if hit count hits limit then game over
}

export function attack(piece, shipArray) {
  if (piece.occupied === true) {
    piece.receiveAttack();
    // get ship through piece shipId
    const shipsFiltered = shipArray.filter((s) => s.id === piece.shipId);
    const ship = shipsFiltered[0];
    console.log('type of ship', typeof ship);
    console.log('ship', ship);

    ship.hit();
    return;
  }
  piece.miss = true;
}

export function getOccupiedPieces(gameboard) {
  const merged = [].concat(...gameboard);
  const occupiedPieces = merged.filter((pieces) => pieces.occupied === true);
  return occupiedPieces;
}

// test board piece
export const testPiece = new BoardPiece(0, 0);
testPiece.occupied = true;

// test gameboard
export const testGameboard = function () {
  const arr = [];
  // board size
  const a = 7;
  const b = 7;

  // creating two dimensional array
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i] = [];
    }
  }

  // inserting elements to array
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i][j] = new BoardPiece(i, j);
    }
  }

  return arr;
};

function randomlyPlaceShip(ship, gameboard) {
  // array of pieces that computer can select from
  const mergedGameboard = [].concat.apply([], gameboard);

  // randomize position
  const position = Math.random() < 0.5 ? 'horizontal' : 'vertical';

  // randomly select piece from available pieces based on position
  function selectPiece(position, ship) {
    if (position === 'horizontal') {
      const randomIndex = Math.floor(Math.random() * mergedGameboard.length);
      const selectedPiece = mergedGameboard[randomIndex];
      if (selectedPiece.occupied === true
        || selectedPiece.y + ship.length > 7

      ) { return selectPiece(position, ship); }

      // ships cannot overlap
      if (ship.length === 2) {
        if (gameboard[selectedPiece.x][selectedPiece.y + ship.length - 1].occupied) {
          return selectPiece(position, ship);
        }
      }
      if (ship.length === 3) {
        if (gameboard[selectedPiece.x][selectedPiece.y + ship.length - 1].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x][selectedPiece.y + ship.length - 2].occupied) {
          return selectPiece(position, ship);
        }
      }
      if (ship.length === 4) {
        if (gameboard[selectedPiece.x][selectedPiece.y + ship.length - 1].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x][selectedPiece.y + ship.length - 2].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x][selectedPiece.y + ship.length - 3].occupied) {
          return selectPiece(position, ship);
        }
      }
      if (ship.length === 5) {
        if (gameboard[selectedPiece.x][selectedPiece.y + ship.length - 1].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x][selectedPiece.y + ship.length - 2].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x][selectedPiece.y + ship.length - 3].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x][selectedPiece.y + ship.length - 4].occupied) {
          return selectPiece(position, ship);
        }
      }
      return selectedPiece;
    }

    if (position === 'vertical') {
      const randomIndex = Math.floor(Math.random() * mergedGameboard.length);
      const selectedPiece = mergedGameboard[randomIndex];
      if (selectedPiece.occupied === true
        || selectedPiece.x + ship.length > 7
      ) { return selectPiece(position, ship); }

      // ships cannot overlap
      if (ship.length === 2) {
        if (gameboard[selectedPiece.x + ship.length - 1][selectedPiece.y].occupied) {
          return selectPiece(position, ship);
        }
      }
      if (ship.length === 3) {
        if (gameboard[selectedPiece.x + ship.length - 1][selectedPiece.y].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x + ship.length - 2][selectedPiece.y].occupied) {
          return selectPiece(position, ship);
        }
      }
      if (ship.length === 4) {
        if (gameboard[selectedPiece.x + ship.length - 1][selectedPiece.y].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x + ship.length - 2][selectedPiece.y].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x + ship.length - 3][selectedPiece.y].occupied) {
          return selectPiece(position, ship);
        }
      }
      if (ship.length === 5) {
        if (gameboard[selectedPiece.x + ship.length - 1][selectedPiece.y].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x + ship.length - 2][selectedPiece.y].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x + ship.length - 3][selectedPiece.y].occupied) {
          return selectPiece(position, ship);
        }
        if (gameboard[selectedPiece.x + ship.length - 4][selectedPiece.y].occupied) {
          return selectPiece(position, ship);
        }
      }

      return selectedPiece;
    }
  }
  const selectedPiece = selectPiece(position, ship);
  selectedPiece.occupied = true;
  selectedPiece.shipId = ship.id;

  if (position === 'vertical') {
    // computer vertical placement
    for (let i = 0; i < ship.length; i++) {
      gameboard[selectedPiece.x + i][selectedPiece.y].occupied = true;
      gameboard[selectedPiece.x + i][selectedPiece.y].shipId = ship.id;
    }
  }

  if (position === 'horizontal') {
    // computer horizontal placement
    for (let i = 0; i < ship.length; i++) {
      gameboard[selectedPiece.x][selectedPiece.y + i].occupied = true;
      gameboard[selectedPiece.x][selectedPiece.y + i].shipId = ship.id;
    }
  }
}

// computer places its ships on gameboard randomly
export function computerShipPlacement(gameboard) {
  const carrier = new Ship(5, 1);
  const battleship = new Ship(4, 2);
  const cruiser = new Ship(3, 3);
  const submarine = new Ship(3, 4);
  const patrolBoat = new Ship(2, 5);

  const shipArray = [carrier, battleship, cruiser, submarine, patrolBoat];

  for (let i = 0; i < shipArray.length; i++) {
    randomlyPlaceShip(shipArray[i], gameboard);
  }

  if (getOccupiedPieces(gameboard).length !== 17) {
    alert('Computer ships not placed correctly');
  }

  return shipArray;
}
