import { newShip } from './ship-factory';

test('ship gets hit at 0', () => {
  newShip.hit(0);
  expect(newShip.spaces[0]).toBe(true);
  expect(newShip.spaces[1]).toBe(false);
});

test('ship sinks', () => {
  newShip.hit(0);
  newShip.hit(1);
  newShip.hit(2);
  expect(newShip.sunk).toBe(true);
});

test('ship hit location is given after hit', () => {
  newShip.hit(0);
  expect(newShip.hitLocation).toBe(0);
});
