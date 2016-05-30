import test from 'tape';
import deepFreeze from 'deep-freeze';
import score, { getDefState } from '../reducers/score';

test('Can increase score', (assert) => {
  let state = getDefState();

  const expected = { one: { points: 1, games: 0, winner: false } };
  const actual = score(state, {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.one, expected.one);
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

  const expected = { one: { points: 0, games: 1, winner: false } };
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

  const expected = { one: { points: 0, games: 2, winner: true }};
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
    one: { points: 5, games: 0, winner: false },
    two: { points: 4, games: 0, winner: false }
  };

  const actual = score(state, {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.one, expected.one);
  assert.end();
});
