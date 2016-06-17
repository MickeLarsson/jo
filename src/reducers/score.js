const defState = {
    one: {
      games: 0,
      points: 0,
    },
    two: {
      games: 0,
      points: 0,
    }
  };

const score = (state = defState, action) => {
  console.log('score');
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        [action.player]: {
          ...state[action.player],
          points: state[action.player].points + 1
        }
      }
    case 'DECREMENT':
      return {
        ...state,
        [action.player]: {
          ...state[action.player],
          points: Math.max(state[action.player].points - 1, 0)
        }
      }
  }

  return state;
}

export default score;
