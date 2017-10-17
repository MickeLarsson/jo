import test from 'tape';
import deepFreeze from 'deep-freeze';
import winning from '../reducers/winning';

test('Match is won when game is same as limit', (assert) => {
  const state = { p1: {games: 2, points: 0 }, p2: {games: 0, points: 0} };
  const limits = {gamesToWin: 2};

  const actual = winning(state, limits);

  assert.deepEqual(actual, 'p1');
  assert.end();
});

test('None is winner when we have not reached the limit', (assert) => {
  const state = { p1: {games: 1, points: 4 }, p2: {games: 1, points: 2} };
  const limits = {gamesToWin: 2};

  const actual = winning(state, limits);

  assert.deepEqual(actual, 'none');
  assert.end();
});
