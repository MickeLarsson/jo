import test from 'tape';
import applyLimits from '../reducers/applyLimits';

test('Game is won when points is same as limit', (assert) => {
  const state = { one: {games: 0, points: 5 }, two: {games: 0, points: 0} };
  const limits = {gameGoesTo: 5};
  const expected = { one: { games: 1, points: 0 } };

  const actual = applyLimits(state, limits);

  assert.deepEqual(actual.one, expected.one);
  assert.end();
});

test('Game has to be won with a two points margin', (assert) => {
  const state = { one: {games: 0, points: 5 }, two: {games: 0, points: 4} };
  const limits = {gameGoesTo: 5};
  const expected = { one: { games: 0, points: 5 }, two: {games: 0, points: 4} };

  const actual = applyLimits(state, limits);

  assert.deepEqual(actual.one, expected.one);
  assert.deepEqual(actual.two, expected.two);
  assert.end();
});

test('When game is won, the points for both players are reset', (assert) => {
  const state = { one: {games: 0, points: 5 }, two: {games: 0, points: 3} };
  const limits = {gameGoesTo: 5};
  const expected = { one: { games: 1, points: 0 }, two: {games: 0, points: 0} };

  const actual = applyLimits(state, limits);

  assert.deepEqual(actual, expected);
  assert.end();
});



