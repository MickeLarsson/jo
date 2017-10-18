import score from './score';
import applyLimits from './applylimits';

const defState = {
  initialServer: '',
  limits: {
    gameGoesTo: 11,
    gamesToWin: 2
  },
  score: {
    p1: {
      games: 0,
      points: 0,
    },
    p2: {
      games: 0,
      points: 0,
    }
  },
  players: {
    p1: {
      id: null,
    },
    p2: {
      id: null,
    }
  }
};

export const getDefState = () => defState;

const getPlayerBySide = (side) => {
  if (side === 'l')
    return 'p1';

  if (side === 'r')
    return 'p2';

  return 'p1';
};

const match = (state = defState, action) => {
  switch (action.type) {
    case 'BTN_SINGLE':
      if (state.initialServer === '') {
        return {
          ...state,
          initialServer: getPlayerBySide(action.side),
        }
      }
    case 'BTN_SINGLE':
    case 'BTN_DOUBLE': {
      const newScore = score(state, action);
      const limitedScore = applyLimits(newScore, state.limits);
      return {
        ...state,
        score: limitedScore,
      };
    }
    // case 'SELECT_PLAYER':
    //   return selectPlayer(state, action);
    case 'BTN_LONG':
      return defState;
    default:
      return state;
  }
}

export default match;
