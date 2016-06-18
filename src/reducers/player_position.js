const isNewGame = (score) => {
  return (score.one.games + score.two.games >= 1) && (score.one.points + score.two.points === 0);
}

const otherPl = (pl) => pl === 'one' ? 'two' : 'one';

const swapPositions = (pos) => {
  return {
    ...pos,
    l: otherPl(pos.l),
    r: otherPl(pos.r)
  }
}

const getPositions = (score, position) => {
  if (isNewGame(score))
    return swapPositions(position);

  return position;
}

export default getPositions;
