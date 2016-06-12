import React from 'react';
import Points from './points';
import Games from './games';
import ScoreControls from './scorecontrols';

const ScoreLeft = (props) => (
  <div className="score scoreL">
    <Games games={props.match.score.one.games} />
    <Points points={props.match.score.one.points} />
    <ScoreControls player={'one'} { ...props } />
  </div>
);

export default ScoreLeft;
