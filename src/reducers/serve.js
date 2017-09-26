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
      return serve.initial;
  }

  return shouldFlipServer(score, limits)
                    ? otherPl(serve.current)
                    : serve.current
}

const getNumber = (score, flipOnEveryPoint) => {
  if (flipOnEveryPoint)
    return 1;

  return (score.one.points + score.two.points) % 2 + 1;
}

const getServer = (score, serve, limits) => {
  console.log(score);
  return {
    ...serve,
    current: calcServer(score, serve, limits),
    number: getNumber(score, shouldFlipOnEveryPoint(score.one.points, score.two.points, limits.gameGoesTo))
  }
}

export default getServer;
