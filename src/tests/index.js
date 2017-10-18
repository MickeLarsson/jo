import test from 'tape';
import match, { getDefState } from '../reducers/match';
import { getServer } from '../reducers/serve';

test('Can play full game', (assert) => {
  const state = {
    ...getDefState(),
    limits: {
      gamesToWin: 2,
      gameGoesTo: 3
    },
    initialServer: 'p1',
    serve: {
      ...getDefState().serve,
      initial: 'p1'
    }
  }

  const ball1 = match(state, {type: 'BTN_SINGLE', side: 'l'});
  assert.deepEqual(getServer(ball1), 'p1');
  assert.deepEqual(ball1.score, {p1: {games: 0, points: 1}, p2: {games: 0, points: 0}});

  const ball2 = match(ball1, {type: 'BTN_SINGLE', side: 'l'});
  assert.deepEqual(getServer(ball2), 'p2', 'Switch serve on every p2 points');
  assert.deepEqual(ball2.score, {p1: {games: 0, points: 2}, p2: {games: 0, points: 0}});

  const ball3 = match(ball2, {type: 'BTN_SINGLE', side: 'r'});
  assert.deepEqual(getServer(ball3), 'p2');
  assert.deepEqual(ball3.score, {p1: {games: 0, points: 2}, p2: {games: 0, points: 1}});

  const ball4 = match(ball3, {type: 'BTN_SINGLE', side: 'l'});
  assert.deepEqual(getServer(ball4), 'p2', 'Serve stays on same side, but the players changes side, on new game');
  assert.deepEqual(ball4.score, {p1: {games: 1, points: 0}, p2: {games: 0, points: 0}}, 'Increase games for winner, and reset points for looser');

  const ball5 = match(ball4, {type: 'BTN_SINGLE', side: 'r'});
  assert.deepEqual(getServer(ball5), 'p2');
  assert.deepEqual(ball5.score, {p1: {games: 1, points: 1}, p2: {games: 0, points: 0}});

  assert.end();
});
