const isNewGame = (score) => {
  return (score.p1.games + score.p2.games >= 1) && (score.p1.points + score.p2.points === 0);
}

const otherPl = (pl) => pl === 'p1' ? 'p2' : 'p1';

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
