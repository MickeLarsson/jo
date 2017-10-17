import test from 'tape';
import score from '../reducers/score';
import { getDefState } from '../reducers/match';

const defState = () => getDefState();

test('Can increase score', (assert) => {
  const expected = { p1: { points: 1 } };
  const actual = score(getDefState(), {type: 'BTN_SINGLE', side: 'l'});

  assert.deepEqual(actual.p1.points, expected.p1.points);
  assert.end();
});

test('Can increase score on new game', (assert) => {
   const state = {
      ...defState(),
      p1: {
        games: 1,
        points: 0
      }
  };

  const actual = score(defState(), {type: 'BTN_SINGLE', side: 'r'});

  assert.deepEqual(actual.p2.points, 1);
  assert.end();
});

test('Can decrease score', (assert) => {
  const state = {
      ...defState(),
      score: {
        ...defState().score,
      p1: {
        games: 0,
        points: 2
      }
    }
  };

  const expected = { p1: { points: 1 } };
  const actual = score(state, {type: 'BTN_DOUBLE', side: 'l'});

  assert.deepEqual(actual.p1.points, expected.p1.points);
  assert.end();
});

test('Can not decrease to negative score', (assert) => {
  const state = {
      ...defState(),
      score: {
        ...defState().score,
      p1: {
        games: 0,
        points: 0
      }
    }
  };

  const expected = { p1: { points: 0 } };
  const actual = score(state, {type: 'BTN_DOUBLE', side: 'l'});

  assert.deepEqual(actual.p1.points, expected.p1.points);
  assert.end();
});
