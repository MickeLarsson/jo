import test from 'tape';
import { getServer } from '../reducers/serve';

test('Serve changes on every other point', assert => {
  const initialServer = 'p1' ;
  const limits = { gameGoesTo: 11 };

  for (let i = 0; i < limits.gameGoesTo; i+=1) {
    const score = { p1: {games: 0, points: i}, p2: {games: 0, points: 0} };
    const actual = getServer({score, initialServer, limits});
    const expected = ['p1', 'p1', 'p2', 'p2', 'p1', 'p1', 'p2', 'p2', 'p1', 'p1', 'p2', 'p2', 'p1', 'p1', 'p2', 'p2'][i];

    assert.deepEqual(actual, expected);
  }

  assert.end();
});

test('In second game, the servers are fliped', assert => {
  const initialServer = 'p1' ;
  const limits = { gameGoesTo: 11 };

  for (let i = 0; i < limits.gameGoesTo; i+=1) {
    const score = { p1: {games: 1, points: i}, p2: {games: 0, points: 0} };
    const actual = getServer({score, initialServer, limits});
    const expected = ['p2', 'p2', 'p1', 'p1', 'p2', 'p2', 'p1', 'p1', 'p2', 'p2', 'p1', 'p1', 'p2', 'p2', 'p1', 'p1', 'p2', 'p2'][i];

    assert.deepEqual(actual, expected);
  }

  assert.end();
});

test('In third game, server are as same as in first', assert => {
  const initialServer = 'p1' ;
  const limits = { gameGoesTo: 11 };

  for (let i = 0; i < limits.gameGoesTo; i+=1) {
    const score = { p1: {games: 1, points: i}, p2: {games: 1, points: 0} };
    const actual = getServer({score, initialServer, limits});
    const expected = ['p1', 'p1', 'p2', 'p2', 'p1', 'p1', 'p2', 'p2', 'p1', 'p1', 'p2', 'p2', 'p1', 'p1', 'p2', 'p2'][i];

    assert.deepEqual(actual, expected);
  }

  assert.end();
});

test('Serve is changed on every even point', (assert) => {
  const score = { p1: {games: 0, points: 2 }, p2: {games: 0, points: 0} };
  const initialServer = 'p1' ;
  const limits = { gameGoesTo: 5 };

  const actual = getServer({score, initialServer, limits});

  assert.deepEqual(actual, 'p2');
  assert.end();
});

test('Serve is not changed on uneven point', (assert) => {
  const score = { p1: {games: 0, points: 2 }, p2: {games: 0, points: 1} };
  const initialServer = 'p1' ;
  const limits = { gameGoesTo: 5 };

  const actual = getServer({score, initialServer, limits});

  assert.deepEqual(actual, 'p2');
  assert.end();
});

test('Serve is changed on every point when game limit is passed', (assert) => {
  const score = { p1: {games: 0, points: 5 }, p2: {games: 0, points: 4} };
  const initialServer = 'p1';
  const limits = { gameGoesTo: 5 };

  const actual = getServer({score, initialServer, limits});

  assert.deepEqual(actual, 'p2');
  assert.end();
});

test('Serve is changed on every new game', (assert) => {
  const score = { p1: {games: 1, points: 0 }, p2: {games: 0, points: 0} };
  const initialServer = 'p1';
  const limits = { };

  const actual = getServer({score, initialServer, limits});

  assert.deepEqual(actual, 'p2');
  assert.end();
});

test('Initial server starts every even game', (assert) => {
  const score = { p1: {games: 1, points: 0 }, p2: { games: 1, points: 0 } };
  const initialServer = 'p2';
  const limits = { };

  const actual = getServer({score, initialServer, limits});

  assert.deepEqual(actual, 'p2');
  assert.end();
});
