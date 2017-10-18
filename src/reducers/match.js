import { combineReducers } from 'redux';
import score from './score';
import winning from './winning';
import { getServer } from './serve';
import applyLimits from './applylimits';
import getPositions from './player_position';

const defState = {
  winner: 'none',
  matchIsStarted: false,
  initialServer: '',
  serve: {
    initial: '',
    current: 'p1',
    number: 1
  },
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
  },
  position: {
    l: 'p1',
    r: 'p2'
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
        position: getPositions(limitedScore, state.position)
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
