export default class Player {
  constructor(name) {
    this.name = name;
  }

  // player uses placeShip function to place ships on gameboard
  placePlayerShips(gameboard) {
    document.querySelectorAll('.board-piece').forEach((piece) => {
      piece.addEventListener('click', () => {
        const x = piece.getAttribute('data-x');
        const y = piece.getAttribute('data-y');
        console.log(`x: ${x}, y: ${y}`);
      });
    });
  }
}
