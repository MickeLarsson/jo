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

const shouldFlipOnEveryPoint = () => onePoints >= gameGoesTo - 1 && twoPoints >= gameGoesTo - 1

const shouldFlipServer = (state) => {
  const onePoints = state.one.points;
  const twoPoints = state.two.points;
  const gameGoesTo = state.limits.gameGoesTo;

  if (shouldFlipOnEveryPoint())
    return true;

  return (onePoints + twoPoints) % 2 === 0;
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
