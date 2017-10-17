import test from 'tape';
import applyLimits from '../reducers/applyLimits';

test('Game is won when points is same as limit', (assert) => {
  const state = { p1: {games: 0, points: 5 }, p2: {games: 0, points: 0} };
  const limits = {gameGoesTo: 5};
  const expected = { p1: { games: 1, points: 0 } };

  const actual = applyLimits(state, limits);

  assert.deepEqual(actual.p1, expected.p1);
  assert.end();
});

test('Game has to be won with a p2 points margin', (assert) => {
  const state = { p1: {games: 0, points: 5 }, p2: {games: 0, points: 4} };
  const limits = {gameGoesTo: 5};
  const expected = { p1: { games: 0, points: 5 }, p2: {games: 0, points: 4} };

  const actual = applyLimits(state, limits);

  assert.deepEqual(actual.p1, expected.p1);
  assert.deepEqual(actual.p2, expected.p2);
  assert.end();
});

test('When game is won, the points for both players are reset', (assert) => {
  const state = { p1: {games: 0, points: 5 }, p2: {games: 0, points: 3} };
  const limits = {gameGoesTo: 5};
  const expected = { p1: { games: 1, points: 0 }, p2: {games: 0, points: 0} };

  const actual = applyLimits(state, limits);

  assert.deepEqual(actual, expected);
  assert.end();
});
