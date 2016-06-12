const otherPl = (pl) => pl === 'one' ? 'two' : 'one';

const shouldFlipOnEveryPoint = (onePoints, twoPoints, gameGoesTo) =>
  onePoints >= gameGoesTo - 1 && twoPoints >= gameGoesTo - 1;

const flipOnEveryOtherPoint = (onePoints, twoPoints) =>
  (onePoints + twoPoints) % 2 === 0;

const shouldFlipServer = (score, limits) => {
  return shouldFlipOnEveryPoint(score.one.points, score.two.points, limits.gameGoesTo)
         || flipOnEveryOtherPoint(score.one.points, score.two.points);
}

const calcServer = (score, serve, limits) => {
  if (score.one.points === 0 && score.two.points === 0) {
    if ((score.one.games + score.two.games) % 2 === 0)
      return serve.initial;
    else
      return otherPl(serve.initial);
  }

  return shouldFlipServer(score, limits)
                    ? otherPl(serve.current)
                    : serve.current
}

const getServer = (score, serve, limits) => {
  console.log(score);
  return {
    ...serve,
    current: calcServer(score, serve, limits)
  }
}

export default getServer;
