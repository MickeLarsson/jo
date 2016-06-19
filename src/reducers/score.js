const score = (state = {position: {l: '', r: ''}}, action) => {


  switch (action.type) {
    case 'INCREMENT': {
        const pl = state.position[action.side];
        console.log('pl ' + pl);
        return {
              ...state.score,
              [pl]: {
                ...state.score[pl],
                points: state.score[pl].points + 1
              }
            }
    }
    case 'DECREMENT': {
        const pl = state.position[action.side];
        console.log('pl ' + pl);
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
