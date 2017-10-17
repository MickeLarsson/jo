import test from 'tape';
import match, { getDefState } from '../reducers/match';

test('Can play full game', (assert) => {
  const state = {
    ...getDefState(),
    limits: {
      gamesToWin: 2,
      gameGoesTo: 3
    },
    serve: {
      ...getDefState().serve,
      initial: 'p1'
    }
  }

  const ball1 = match(state, {type: 'BTN_SINGLE', side: 'l'});
  assert.deepEqual(ball1.serve.current, 'p1');
  assert.deepEqual(ball1.score, {p1: {games: 0, points: 1}, p2: {games: 0, points: 0}});

  const ball2 = match(ball1, {type: 'BTN_SINGLE', side: 'l'});
  assert.deepEqual(ball2.serve.current, 'p2', 'Switch serve on every p2 points');
  assert.deepEqual(ball2.score, {p1: {games: 0, points: 2}, p2: {games: 0, points: 0}});

  const ball3 = match(ball2, {type: 'BTN_SINGLE', side: 'r'});
  assert.deepEqual(ball3.serve.current, 'p2');
  assert.deepEqual(ball3.score, {p1: {games: 0, points: 2}, p2: {games: 0, points: 1}});

  const ball4 = match(ball3, {type: 'BTN_SINGLE', side: 'l'});
  assert.deepEqual(ball4.serve.current, 'p1', 'Serve stays on same side on new game');
  assert.deepEqual(ball4.score, {p1: {games: 1, points: 0}, p2: {games: 0, points: 0}}, 'Increase games for winner, and reset points for looser');

  const ball5 = match(ball4, {type: 'BTN_SINGLE', side: 'r'});
  assert.deepEqual(ball5.serve.current, 'p1');
  assert.deepEqual(ball5.score, {p1: {games: 1, points: 1}, p2: {games: 0, points: 0}});

  assert.end();
});
