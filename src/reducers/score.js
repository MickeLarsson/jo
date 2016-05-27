const gameGoesTo = 5;

const gameWon = (p1Score, p2Score) => {
  return (p1Score === gameGoesTo || p2Score === gameGoesTo)
}

const canIncrement = (p1Score, p2Score) => {
  return !gameWon(p1Score, p2Score);
}

const score = (state = {one: { points: 0, games: 0 }, two: { points: 0, games: 0 }, gameover: false}, action) => {
  if (state.gameover)
    return state;

console.log('reduce!');
  switch (action.type){
    case 'INCREMENT': {
      console.log('inc!');
      return {
        ...state,
        two: {
          ...state.two,
          points: state.two.points + 1
        },
      };

      // if (canIncrement(state.one, state.two)) {
      //   newState.gameover = true;
      //   return newState;
      // } else {
      //   return state;
      // }
    }
    case 'DECREMENT': {
      return {
        ...state,
        two: {
          ...state.two,
          points: state.two.points - 1
        },
      };
    }
    default:
      return state;
  }
}

export default score
