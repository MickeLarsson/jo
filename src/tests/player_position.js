import test from 'tape';
import match, { getDefState } from '../reducers/match';

test('Players switches side on new game', (assert) => {
  const state = {
    ...getDefState(),
    limits: {
      ...getDefState().limits,
      gameGoesTo: 5
    },
    score: {
      ...getDefState().score,
      one: {
        ...getDefState().score.one,
        points: 4
      }
    }
  }
  const actual = match(state, {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.position.r, 'one');
  assert.end();
});

test('Only switches side on new game', (assert) => {
  const state = {
    ...getDefState(),
    limits: {
      ...getDefState().limits,
      gameGoesTo: 5
    },
    score: {
      ...getDefState().score,
      one: {
        ...getDefState().score.one,
        points: 2
      }
    },
  }
  const actual = match(state, {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.position.l, 'one');
  assert.end();
});
