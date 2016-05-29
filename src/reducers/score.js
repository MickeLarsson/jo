const increment = (state, limits) => {
  if (state.points < limits.gameGoesTo)
    return {
      ...state,
      points: state.points + 1
    };

  state = {
      ...state,
      games: state.games + 1,
      points: 0
    };

  state.winner = state.games === limits.gamesToWin;

  return state;
}

const decrement = (state, limits) => {
  if (state.points === 0)
    return {
      ...state,
      games: state.games - 1,
      points: limits.gameGoesTo
    };

  return {
    ...state,
    points: state.points - 1
  };
}

const setScore = (state, action, limits) => {
  switch(action.type) {
    case 'INCREMENT':
      return increment(state, limits);
    case 'DECREMENT':
      return decrement(state, limits);
    default:
      return state;
  }
}

const shouldFlipServer = (state) => {
  return (state.one.points + state.two.points) % 2 === 0;
}

const servers = ['one', 'two'];
let i = 0;

const setServer = (state) => {
  if (shouldFlipServer(state))
    i = i + 1;

  return {
    ...state,
    server: servers[i % 2]
  }
}

const defaultScore = { points: 0, games: 0, winner: false };
const defLimits = { gameGoesTo: 5, gamesToWin: 2 };

const score = (state = {one: defaultScore, two: defaultScore, limits: defLimits, server: 'one' }, action) => {
  if (state.one.winner || state.two.winner)
    return state;

  state = {
    ...state,
    [action.player]: setScore(state[action.player], action, state.limits)
  };

  return setServer(state);
}

export default score
