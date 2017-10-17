import React from 'react';
import { getPerson } from '../reducers/people';


const getScore = (props) => {
    if (props.match.winner === 'none')
      return '';

    const score = props.match.score;
    const winner = props.match.winner || 'p1';
    const looser = props.match.winner === 'p1' ? 'p2' : 'p1';
    return score ? `${score[winner].games}-${score[looser].games}` : '';
}

const getWinner = (props) => {
  if (props.match.winner === 'none') {
    return {name: '', score: ''};
  }

  const winner = getPerson(props.people, props.match.players[props.match.winner].id);

  return {
    name: `${winner.first} ${winner.last}`,
    score: getScore(props)
  }
}

const Winner = (props) => {
  const winner = getWinner(props);
  const gameOver = props.match.winner !== 'none';

  return (
    <div id="winner" className={ gameOver ? 'winner show animate' : 'winner' }>
      <div className="winner__confetti"></div>

      <div className="winner__inner">
        <div className="congrats">
          <strong>Congrats, <span className="winner__name">{winner.name}</span>!<br /></strong>
          <span className="winner__score">{winner.score}</span>
        </div>

        <img id="winner_gif" className="winner__gif" src="http://i.imgur.com/YCsSUI7.gif" />

        <div className="buttonWrap">
          <a href="/" className="button">New game</a>
        </div>
      </div>
    </div>);
}

export default Winner;
