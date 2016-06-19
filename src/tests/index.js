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
      initial: 'one'
    }
  }

  const ball1 = match(state, {type: 'INCREMENT', side: 'l'});
  assert.deepEqual(ball1.serve.current, 'one');
  assert.deepEqual(ball1.score, {one: {games: 0, points: 1}, two: {games: 0, points: 0}});

  const ball2 = match(ball1, {type: 'INCREMENT', side: 'l'});
  assert.deepEqual(ball2.serve.current, 'two', 'Switch serve on every two points');
  assert.deepEqual(ball2.score, {one: {games: 0, points: 2}, two: {games: 0, points: 0}});

  const ball3 = match(ball2, {type: 'INCREMENT', side: 'r'});
  assert.deepEqual(ball3.serve.current, 'two');
  assert.deepEqual(ball3.score, {one: {games: 0, points: 2}, two: {games: 0, points: 1}});

  const ball4 = match(ball3, {type: 'INCREMENT', side: 'l'});
  assert.deepEqual(ball4.serve.current, 'two', 'Switch serve on new game');
  assert.deepEqual(ball4.score, {one: {games: 1, points: 0}, two: {games: 0, points: 0}}, 'Increase games for winner, and reset points for looser');

  const ball5 = match(ball4, {type: 'INCREMENT', side: 'r'});
  assert.deepEqual(ball5.serve.current, 'two');
  assert.deepEqual(ball5.score, {one: {games: 1, points: 0}, two: {games: 0, points: 1}});

  assert.end();
});
