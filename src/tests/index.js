import test from 'tape';
import deepFreeze from 'deep-freeze';
import match, { getDefState } from '../reducers/match';

test('Can increase score', (assert) => {
  const expected = { one: { points: 1 } };
  const actual = match(getDefState(), {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.score.one.points, expected.one.points);
  assert.end();
});

test('Can increase score on new game', (assert) => {
   const state = {
    ...getDefState(),
    score: {
      ...getDefState().score,
      one: {
        games: 1,
        points: 0
      }
    },
    limits: {
      gameGoesTo: 5,
      gamesToWin: 2
    }
  };

  const actual = match(getDefState(), {type: 'INCREMENT', player: 'two'});

  assert.deepEqual(actual.score.two.points, 1);
  assert.end();
});

test('Can decrease score', (assert) => {
  const state = {
    ...getDefState(),
    score: {
      ...getDefState().score,
      one: {
        games: 0,
        points: 2
      }
    }
  };

  const expected = { one: { points: 1 } };
  const actual = match(state, {type: 'DECREMENT', player: 'one'});

  assert.deepEqual(actual.score.one.points, expected.one.points);
  assert.end();
});

test('When reaching required points for game, game is increased and points for both players are set to zero', (assert) => {
  const defState = getDefState();
  const state = {
    ...defState,
    limits: {
      ...defState.limits,
      gameGoesTo: 5
    },
    score: {
      ...defState.score,
      one: {
        ...defState.score.one,
        points: 4
      }
    }
  };

  const expected = { ...defState.one, points: 0, games: 1 };
  const actual = match(state, {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.score.one, expected);
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
    score: {
      ...defState.score,

      one: {
        ...defState.score.one,
        points: 4,
        games: 1
      },
      two: {
        ...defState.score.two,
        points: 2,
      }
    }
  };

  const expected = {
    score: {
      one: { ...defState.one, points: 0, games: 2, },
      two: { ...defState.two, points: 0, games: 0 }
    },
    winner: 'one'
  };
  const actual = match(state, {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.score.one, expected.score.one);
  assert.deepEqual(actual.score.two, expected.score.two, 'Player two should have zero points');
  assert.deepEqual(actual.winner, expected.winner);
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
    score: {
      one: {
        ...defState.score.one,
        points: 4
      },
      two: {
        ...defState.score.two,
        points: 4
      }
    }
  };

  const expected = {
    one: { ...defState.score.one, points: 5 }
  };

  const actual = match(state, {type: 'INCREMENT', player: 'one'});

  assert.deepEqual(actual.score.one, expected.one);
  assert.end();
});

test('Serve is alternated before every other point', (assert) => {
  var initial = {
    ...getDefState(),
    serve: {
      started: 'two',
      current: 'two'
    }
  };

  const first = match(initial, {type: 'INCREMENT', player: 'one'});
  assert.equal(first.serve.current, 'two');

  const second = match(first, {type: 'INCREMENT', player: 'one'});
  assert.equal(second.serve.current, 'one');

  assert.end();
});

test('Serve is alternated before every point when you have to win by two', (assert) => {
  const state = getDefState();
  var initial = {
    ...state,
    score: {
      ...state.score,
      one: {
        ...state.score.one,
        points: 9
      },
      two: {
        ...state.score.two,
        points: 10
      }
    },
    limits: {
      ...state.limits,
      gameGoesTo: 11
    },
    serve: {
      current: 'two',
      initial: 'two'
    }
  };

  const first = match(initial, {type: 'INCREMENT', player: 'one'});
  assert.equal(first.serve.current, 'one', 'should have switched after first point');

  const second = match(first, {type: 'INCREMENT', player: 'two'});
  assert.equal(second.serve.current, 'two', 'should have switched after second point');

  assert.end();
});

test('Serve is alternated on every game', (assert) => {
  const state = {
    ...getDefState(),
    limits: {
      ...getDefState().limits,
      gameGoesTo: 3
    }
  }

  let tempState = getDefState();
  for (var i = 0; i < 5; i++) {
    tempState = match(tempState, {type: 'INCREMENT', player: 'one'});
  }

  assert.equal(tempState.serve.current, 'two');
  assert.end();
});

test('Can play full game', (assert) => {
  const state = {
    ...getDefState(),
    limits: {
      gamesToWin: 2,
      gameGoesTo: 3
    }
  }

  const ball1 = match(state, {type: 'INCREMENT', player: 'one'});
  assert.deepEqual(ball1.serve.current, 'one');
  assert.deepEqual(ball1.score, {one: {games: 0, points: 1}, two: {games: 0, points: 0}});

  const ball2 = match(ball1, {type: 'INCREMENT', player: 'one'});
  assert.deepEqual(ball2.serve.current, 'two', 'Switch serve on every two points');
  assert.deepEqual(ball2.score, {one: {games: 0, points: 2}, two: {games: 0, points: 0}});

  const ball3 = match(ball2, {type: 'INCREMENT', player: 'two'});
  assert.deepEqual(ball3.serve.current, 'two');
  assert.deepEqual(ball3.score, {one: {games: 0, points: 2}, two: {games: 0, points: 1}});

  const ball4 = match(ball3, {type: 'INCREMENT', player: 'one'});
  assert.deepEqual(ball4.serve.current, 'two', 'Switch serve on new game');
  assert.deepEqual(ball4.score, {one: {games: 1, points: 0}, two: {games: 0, points: 0}}, 'Increase games for winner, and reset points for looser');

  const ball5 = match(ball4, {type: 'INCREMENT', player: 'two'});
  assert.deepEqual(ball5.serve.current, 'two');
  assert.deepEqual(ball5.score, {one: {games: 1, points: 0}, two: {games: 0, points: 1}});

  assert.end();
});
