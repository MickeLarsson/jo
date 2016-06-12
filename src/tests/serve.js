import test from 'tape';
import getServer from '../reducers/serve';

test('Serve is changed on every even point', (assert) => {
  const score = { one: {games: 0, points: 2 }, two: {games: 0, points: 0} };
  const serve = { current: 'one' };
  const limits = { gameGoesTo: 5 };
  const expected = { current: 'two' };

  const actual = getServer(score, serve, limits);

  assert.deepEqual(actual, expected);
  assert.end();
});

test('Serve is not changed on uneven point', (assert) => {
  const score = { one: {games: 0, points: 2 }, two: {games: 0, points: 1} };
  const serve = { current: 'one' };
  const limits = { gameGoesTo: 5 };
  const expected = { current: 'one' };

  const actual = getServer(score, serve, limits);

  assert.deepEqual(actual, expected);
  assert.end();
});

test('Serve is changed on every point when game limit is passed', (assert) => {
  const score = { one: {games: 0, points: 5 }, two: {games: 0, points: 4} };
  const serve = { current: 'one' };
  const limits = { gameGoesTo: 5 };
  const expected = { current: 'two' };

  const actual = getServer(score, serve, limits);

  assert.deepEqual(actual, expected);
  assert.end();
});

test('Serve is changed on every new game', (assert) => {
  const score = { one: {games: 1, points: 0 }, two: {games: 0, points: 0} };
  const serve = { current: 'one', initial: 'one' };
  const limits = { };
  const expected = { current: 'two', initial: 'one' };

  const actual = getServer(score, serve, limits);

  assert.deepEqual(actual, expected);
  assert.end();
});

test('Initial server starts every even game', (assert) => {
  const score = { one: {games: 1, points: 0 }, two: { games: 1, points: 0 } };
  const serve = { current: 'two', initial: 'one' };
  const limits = { };
  const expected = { current: 'one', initial: 'one' };

  const actual = getServer(score, serve, limits);

  assert.deepEqual(actual, expected);
  assert.end();
});
