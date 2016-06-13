const otherPl = (pl) => pl === 'one' ? 'two' : 'one';

const hasWonGame = (score, limits, pl) => {
  return score[pl].points >= limits.gameGoesTo
  && score[pl].points - score[otherPl(pl)].points > 1;
}

const limitScore = (score, limits, pl) => {
  if (hasWonGame(score, limits, pl)) {
    return {
      games: score[pl].games + 1,
      points: 0
    };
  }

  if (hasWonGame(score, limits, otherPl(pl))) {
    return {
      ...score[pl],
      points: 0
    };
  }

  return score[pl];
}

const applyLimits = (score, limits) => ({
  one: limitScore(score, limits, 'one'),
  two: limitScore(score, limits, 'two')
})

export default applyLimits;
