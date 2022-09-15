const Ship = require('./ship-factory');

test('ship gets hit at 0', () => {
  Ship.newShip.hit(0);
  expect(Ship.newShip.spaces[0]).toBe(true);
  expect(Ship.newShip.spaces[1]).toBe(false);
});
