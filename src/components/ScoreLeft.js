import React from 'react';
import Points from './points';
import Games from './games';
import ScoreControls from './scorecontrols';

const ScoreLeft = (props) => (
  <div className="score scoreL">
    <Games games={props.match.score[props.match.position.l].games} />
    <Points points={props.match.score[props.match.position.l].points} />
    <ScoreControls player={props.match.position.l} { ...props } />
  </div>
);

export default ScoreLeft;
