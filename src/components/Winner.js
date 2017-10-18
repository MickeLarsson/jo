import React from 'react';
import { connect } from 'react-redux';
import winning from '../reducers/winning';

const Winner = ({winner, gameOver}) => (
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

export default connect(state => ({
  winner: winning(state),
  gameOver: winning(state) !== 'none',
}))(Winner);
