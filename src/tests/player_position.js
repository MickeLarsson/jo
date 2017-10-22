import test from 'tape';
import match, { getDefState } from '../reducers/match';
import { getPlayer } from '../reducers/player_position';

test('Players switches side on new game', (assert) => {
  const state = {
    ...getDefState(),
    limits: {
      ...getDefState().limits,
      gameGoesTo: 5
    },
    score: {
      ...getDefState().score,
      p1: {
        ...getDefState().score.p1,
        points: 4
      }
    }
  }
  const actual = match(state, {type: 'BTN_SINGLE', side: 'l'});

  assert.deepEqual(getPlayer('r', state.score), 'p2');
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
      p1: {
        ...getDefState().score.p1,
        points: 2
      }
    },
  }
  const actual = match(state, {type: 'BTN_SINGLE', side: 'l'});

  assert.deepEqual(getPlayer('l', state.score), 'p1');
  assert.end();
});
