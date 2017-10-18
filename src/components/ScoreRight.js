import React from 'react';
import { connect } from 'react-redux';
import Points from './points';
import Games from './games';
import { getPlayerRight } from '../reducers/player_position';

const ScoreRight = ({ games, points }) => (
  <div className="score scoreR">
    <Points points={points} />
    <Games games={games} />
  </div>
);

export default connect(
  state => ({
    games: state.match.score[getPlayerRight(state.match)].games,
    points: state.match.score[getPlayerRight(state.match)].points
})
)(ScoreRight);
