import React from 'react';
import { getPerson } from '../reducers/people';


const getScore = (props) =>
    props.score.one.winner
      ? `${props.score.one.games}-${props.score.two.games}`
      : `${props.score.two.games}-${props.score.one.games}`

const getWinner = (props) => {
  const winner = getPerson(props.people, props.score.one.winner ? props.params.one : props.params.two);

  return {
    name: `${winner.first} ${winner.last}`,
    score: getScore(props)
  }
}

const Winner = (props) => {
  const winner = getWinner(props);
  const gameOver = props.score.one.winner || props.score.two.winner || false;

  return (
    <div id="winner" className={ gameOver ? 'winner show animate' : 'winner' }>
      <div className="winner__confetti"></div>

      <div className="winner__inner">
        <div className="congrats">
          <strong>Congrats, <span className="winner__name">{winner.name}</span>!<br /></strong>
          <span className="winner__score">{winner.score}</span>
        </div>

        <img id="winner_gif" className="winner__gif" src="http://media4.giphy.com/media/l41lYCDgxP6OFBruE/giphy.gif" />

        <div className="buttonWrap">
          <a href="/" className="button">New game</a>
        </div>
      </div>
    </div>);
}

export default Winner;
