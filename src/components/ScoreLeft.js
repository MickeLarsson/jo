import React from 'react';
import { connect } from 'react-redux';
import Points from './points';
import Games from './games';
import { getPlayerLeft } from '../reducers/player_position';

const ScoreLeft = ({ games, points }) => (
  <div className="score scoreL">
    <Games games={games} />
    <Points points={points} />
  </div>
);

export default connect(
  state => ({
    games: state.match.score[getPlayerLeft(state.match)].games,
    points: state.match.score[getPlayerLeft(state.match)].points
})
)(ScoreLeft);
