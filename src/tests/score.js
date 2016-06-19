import test from 'tape';
import score from '../reducers/score';
import { getDefState } from '../reducers/match';

const defState = () => getDefState();

test('Can increase score', (assert) => {
  const expected = { one: { points: 1 } };
  const actual = score(getDefState(), {type: 'INCREMENT', side: 'l'});

  assert.deepEqual(actual.one.points, expected.one.points);
  assert.end();
});

test('Can increase score on new game', (assert) => {
   const state = {
      ...defState(),
      one: {
        games: 1,
        points: 0
      }
  };

  const actual = score(defState(), {type: 'INCREMENT', side: 'r'});

  assert.deepEqual(actual.two.points, 1);
  assert.end();
});

test('Can decrease score', (assert) => {
  const state = {
      ...defState(),
      score: {
        ...defState().score,
      one: {
        games: 0,
        points: 2
      }
    }
  };

  const expected = { one: { points: 1 } };
  const actual = score(state, {type: 'DECREMENT', side: 'l'});

  assert.deepEqual(actual.one.points, expected.one.points);
  assert.end();
});

test('Can not decrease to negative score', (assert) => {
  const state = {
      ...defState(),
      score: {
        ...defState().score,
      one: {
        games: 0,
        points: 0
      }
    }
  };

  const expected = { one: { points: 0 } };
  const actual = score(state, {type: 'DECREMENT', side: 'l'});

  assert.deepEqual(actual.one.points, expected.one.points);
  assert.end();
});
