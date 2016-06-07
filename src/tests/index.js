import test from 'tape';
import deepFreeze from 'deep-freeze';
import score, { getDefState } from '../reducers/score';

test('Can increase score', (assert) => {
  let state = getDefState();

  const expected = { one: { points: 1 } };
  const actual = score(state, {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.one.points, expected.one.points);
  assert.end();
});

test('When reaching required points for game, game is increased and points are set to zero', (assert) => {
  const defState = getDefState();
  const state = {
    ...defState,
    limits: {
      ...defState.limits,
      gameGoesTo: 5
    },
    one: {
      ...defState.one,
      points: 4
    }
  };

  const expected = { one: { ...defState.one, points: 0, games: 1} };
  const actual = score(state, {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.one, expected.one);
  assert.end();
});

test('When reaching required games for match, game is increased and points are set to zero, and player is marked as winner', (assert) => {
  const defState = getDefState();
  const state = {
    ...defState,
    limits: {
      ...defState.limits,
      gameGoesTo: 5,
      gamesToWin: 2
    },
    one: {
      ...defState.one,
      points: 4,
      games: 1
    }
  };

  const expected = { one: { ...defState.one, points: 0, games: 2, winner: true }};
  const actual = score(state, {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.one, expected.one);
  assert.end();
});

test('You have to win by two points', (assert) => {
  const defState = getDefState();
  const state = {
    ...defState,
    limits: {
      ...defState.limits,
      gameGoesTo: 5
    },
    one: {
      ...defState.one,
      points: 4
    },
    two: {
      ...defState.two,
      points: 4
    }
  };

  const expected = {
    one: { ...defState.one, points: 5 }
  };

  const actual = score(state, {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.one, expected.one);
  assert.end();
});

test('The points of the loser is set to 0', (assert) => {
  assert.fail();

  assert.end();
});

test('Serve is alternated before every other point', (assert) => {
  var initial = {
    ...getDefState(),
    server: 'two'
  };

  const first = score(initial, {type: 'INCREMENT', player: 'one'});
  assert.equal(first.server, 'two');

  const second = score(first, {type: 'INCREMENT', player: 'one'});
  assert.equal(second.server, 'one');

  assert.end();
});

test('Serve is alternated before every point when you have to win by two', (assert) => {
  const state = getDefState();
  var initial = {
    ...state,
    one: {
      ...state.one,
      points: 9
    },
    two: {
      ...state.two,
      points: 10
    },
    limits: {
      ...state.limits,
      gameGoesTo: 11
    },
    server: 'two'
  };

  const first = score(initial, {type: 'INCREMENT', player: 'one'});
  assert.equal(first.server, 'one', 'should have switched after first point');

  const second = score(first, {type: 'INCREMENT', player: 'two'});
  assert.equal(second.server, 'two', 'should have switched after second point');

  assert.end();
});

test('Serve is alternated on every game', (assert) => {
  assert.fail();

  assert.end();
});
