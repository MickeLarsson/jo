import React from 'react';
import Points from './points';
import Games from './games';
import ScoreControls from './scorecontrols';

const ScoreRight = (props) => (
  <div className="score scoreR">
    <Points points={props.match.score[props.match.position.r].points} />
    <Games games={props.match.score[props.match.position.r].games} />
    <ScoreControls side='r' { ...props } />
  </div>
);

export default ScoreRight;
