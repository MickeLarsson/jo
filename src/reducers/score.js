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

const shouldFlipOnEveryPoint = (onePoints, twoPoints, gameGoesTo) =>
  onePoints >= gameGoesTo - 1 && twoPoints >= gameGoesTo - 1;

const flipOnEveryOtherPoint = (onePoints, twoPoints) =>
  (onePoints + twoPoints) % 2 === 0;

const shouldFlipServer = (state) => {
  return shouldFlipOnEveryPoint(state.one.points, state.two.points, state.limits.gameGoesTo)
         || flipOnEveryOtherPoint(state.one.points, state.two.points);
}

const setServer = (state) => {
  return {
    ...state,
    server: shouldFlipServer(state)
                ? otherPlayer(state.server)
                : state.server
  }
}

const otherPlayer = (pl) => {
  return pl === 'one'
      ? 'two'
      : 'one';
}

const setName = (state, pl, name) => {
  return {
    ...state,
    [pl]: {
      ...state[pl],
      name
    }
  };
}

const defaultScore = { points: 0, games: 0, winner: false, name: '' };
const defLimits = { gameGoesTo: 3, gamesToWin: 2 };
const defState = {one: defaultScore, two: defaultScore, limits: defLimits, server: 'one' };

export const getDefState = () => defState;

const score = (state = defState, action) => {
  switch (action.type) {
    case 'SET_NAME': {
      return setName(state, action.player, action.name);
    }
    case 'SELECT_PLAYER': {
      console.log('select player ' + action.pl.id);
      return state;
    }

  }

  if (state.one.winner || state.two.winner)
    return state;

  const otherPl = otherPlayer(action.player);

  const newState = {
    ...state,
    [action.player]: setScore(state[action.player], action, state.limits, state[otherPl].points || 0)
  };

  return setServer(newState);
}

export default score

export const getWinner = (state) => score.one.winner ? 'one' : 'two'
