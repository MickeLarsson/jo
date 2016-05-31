const hasEnoughPointsToWin = (p, pointsToWin) => p >= pointsToWin - 1;

const twoPointsDiff = (p1, p2) => {
  return (p1 - p2) > 0;
}

const increment = (state, limits, otherPlayerPoints) => {
  if (hasEnoughPointsToWin(state.points, limits.gameGoesTo) && twoPointsDiff(state.points, otherPlayerPoints)){
    const games = state.games + 1;
    return {
      ...state,
      games,
      points: 0,
      winner: games === limits.gamesToWin
    };
  }

  return {
    ...state,
    points: state.points + 1
  };
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

const setScore = (state, action, limits, otherPlayerPoints) => {
  switch(action.type) {
    case 'INCREMENT':
      return increment(state, limits, otherPlayerPoints);
    case 'DECREMENT':
      return decrement(state, limits);
    default:
      return state;
  }
}

const shouldFlipServer = (state) => {
  const p1 = state.one.points;
  const p2 = state.two.points;
  const pLim = state.limits.gameGoesTo;

  console.log(`p1: ${p1}, p2: ${p2}, lim: ${pLim}`);

  if (p1 >= pLim - 1 && p2 >= pLim - 1)
    return true;

  return (p1 + p2) % 2 === 0;
}

const setServer = (state) => {
  let server = shouldFlipServer(state)
                ? otherPlayer(state.server)
                : state.server;

  return {
    ...state,
    server
  }
}

const otherPlayer = (pl) => {
  if (pl === 'one')
    return 'two';

  return 'one';
}

const defaultScore = { points: 0, games: 0, winner: false };
const defLimits = { gameGoesTo: 11, gamesToWin: 2 };
const defState = {one: defaultScore, two: defaultScore, limits: defLimits, server: 'one' };

export const getDefState = () => defState;

const score = (state = defState, action) => {
  if (state.one.winner || state.two.winner)
    return state;

  const otherPl = otherPlayer(action.player);

  state = {
    ...state,
    [action.player]: setScore(state[action.player], action, state.limits, state[otherPl].points || 0)
  };

  return setServer(state);
}

export default score
