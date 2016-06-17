import { combineReducers } from 'redux';
import score from './score';
import winning from './winning';
import getServer from './serve';
import applyLimits from './applylimits';

const defState = {
  winner: 'none',
  serve: {
    initial: '',
    current: 'one'
  },
  limits: {
    gameGoesTo: 5,
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
      position: 'l'
    },
    two: {
      id: null,
      position: 'r'
    }
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
    case 'INCREMENT':
    case 'DECREMENT': {
      const newScore = score(state.score, action);
      const scoreWithLimits = applyLimits(newScore, state.limits);
      return {
        ...state,
        score: scoreWithLimits,
        serve: getServer(scoreWithLimits, state.serve, state.limits),
        winner: winning(scoreWithLimits, state.limits)
      };
    }
    case 'SELECT_PLAYER': {
      return selectPlayer(state, action)
    }
    case 'SET_SERVER': {
      return {
        ...state,
        serve: {
          ...state.serve,
          initial: getPlayerBySide(action.side),
          current: getPlayerBySide(action.side),
        }
      }
    }
    default:
      return state;
  }
}

export default match;
