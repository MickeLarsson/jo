const otherPl = (pl) => pl === 'p1' ? 'p2' : 'p1';

export const getPlayerLeft = ({ score }) =>
  (score.p1.games + score.p2.games) % 2 === 0
    ? 'p1'
    : 'p2';

export const getPlayerRight = ({ score }) =>
  otherPl(getPlayerLeft({ score }));

export const getPlayer = (side, score) =>
  side === 'l'
    ? getPlayerLeft({ score })
    : getPlayerRight({ score });
