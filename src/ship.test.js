const Ship = require('./ship-factory');

test('ship gets hit at 0', () => {
  Ship.newShip.hit(0);
  expect(Ship.newShip.spaces[0]).toBe(true);
  expect(Ship.newShip.spaces[1]).toBe(false);
});

test('ship sinks', () => {
  Ship.newShip.hit(0);
  Ship.newShip.hit(1);
  Ship.newShip.hit(2);
  expect(Ship.newShip.sunk).toBe(true);
});

test('ship hit location is given after hit', () => {
  Ship.newShip.hit(0);
  expect(Ship.newShip.hitLocation).toBe(0);
});
