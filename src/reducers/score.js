const score = (state = {position: {l: '', r: ''}}, action) => {
  switch (action.type) {
    case 'BTN_SINGLE': {
      const pl = state.position[action.side];
      return {
        ...state.score,
        [pl]: {
          ...state.score[pl],
          points: state.score[pl].points + 1
        }
      }
    }
    case 'BTN_DOUBLE': {
      const pl = state.position[action.side];
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
