const winning = ({ match: {score, limits} }) => {
  if (score.p1.games === limits.gamesToWin) {
    return 'p1';
  }

  if (score.p2.games === limits.gamesToWin) {
    return 'p2'
  }

  return 'none';
}

export default winning;
