const winning = (score, limits) => {
  if (score.one.games === limits.gamesToWin) {
    return 'one';
  }

  if (score.two.games === limits.gamesToWin) {
    return 'two'
  }

  return 'none';
}

export default winning;
