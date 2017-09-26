import { combineReducers } from 'redux';
import score from './score';
import winning from './winning';
import getServer from './serve';
import applyLimits from './applylimits';
import getPositions from './player_position';

const defState = {
  winner: 'none',
  serve: {
    initial: '',
    current: 'one',
    number: 1
  },
  limits: {
    gameGoesTo: 3,
    gamesToWin: 2
  },
  score: {
    one: {
      games: 0,
      points: 0,
    },
    two: {
      games: 0,
      points: 0,
    }
  },
  players: {
    one: {
      id: null,
    },
    two: {
      id: null,
    }
  },
  position: {
    l: 'one',
    r: 'two'
  }
};

export const getDefState = () => defState;

const selectPlayer = (state, {label, id}) => ({
    ...state,
    players: {
      ...state.players,
      [label]: {
        ...state.players[label],
        id
      }
    }
})

const getPlayerBySide = (side) => {
  if (side === 'l')
    return 'one';

  if (side === 'r')
    return 'two';

  return 'one';
}

const match = (state = defState, action) => {
  switch (action.type) {
    case 'BTN_SINGLE':
    case 'BTN_DOUBLE': {
      if (state.serve.initial === '') {
        return {
          ...state,
          serve: {
            ...state.serve,
            initial: getPlayerBySide(action.side),
            current: getPlayerBySide(action.side),
          }
        }
      }
      const newScore = score(state, action);
      const scoreWithLimits = applyLimits(newScore, state.limits);
      return {
        ...state,
        score: scoreWithLimits,
        serve: getServer(scoreWithLimits, state.serve, state.limits),
        winner: winning(scoreWithLimits, state.limits),
        position: getPositions(scoreWithLimits, state.position)
      };
    }
    case 'SELECT_PLAYER':
      return selectPlayer(state, action);
    case 'BTN_LONG':
      return defState;
    default:
      return state;
  }
}

export default match;
