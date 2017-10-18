import { getPlayer } from './player_position';

const score = (state, action) => {
  switch (action.type) {
    case 'BTN_SINGLE': {
      const pl = getPlayer(action.side, state.score);
      return {
        ...state.score,
        [pl]: {
          ...state.score[pl],
          points: state.score[pl].points + 1
        }
      }
    }
    case 'BTN_DOUBLE': {
      const pl = getPlayer(action.side, state.score);
      return {
        ...state.score,
        [pl]: {
          ...state.score[pl],
          points: Math.max(state.score[pl].points - 1, 0)
        }
      }
    }
  }

  return state;
}

export default score;
