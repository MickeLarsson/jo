const otherPl = (pl) => pl === 'p1' ? 'p2' : 'p1';

const shouldFlipOnEveryPoint = (score, limits) =>
  score.p1.points >= limits.gameGoesTo - 1 && score.p2.points >= limits.gameGoesTo - 1;

const totalPoints = score =>
  score.p1.points + score.p2.points;

const totalGames = score =>
  score.p1.games + score.p2.games;

const isEvenGame = score =>
  (score.p1.games + score.p2.games) % 2 === 0;

const whosTurnIsIt = (totPoints, initialServer, limits) => {
  if (totPoints % 4 === 0)
    return initialServer;
  if (totPoints % 2 === 0)
    return otherPl(initialServer);

  return whosTurnIsIt(totPoints-1, initialServer, limits);
}

const getInitialServerForGame = (score, initialServerForMatch) =>
  isEvenGame(score)
    ? initialServerForMatch
    : otherPl(initialServerForMatch);

export const getServer = ({ score, initialServer, limits }) => {
  const totPoints = totalPoints(score);
  const initialServerForGame = getInitialServerForGame(score, initialServer);

  if (shouldFlipOnEveryPoint(score, limits))
    return totPoints % 2 === 0 ? initialServerForGame : otherPl(initialServerForGame);

  return whosTurnIsIt(totPoints, initialServerForGame, limits);
}

export const getNumber = ({ score, limits }) => {
  if (shouldFlipOnEveryPoint(score, limits))
    return 1;

  return totalPoints(score) % 2 + 1;
}
