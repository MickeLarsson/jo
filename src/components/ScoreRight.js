import React from 'react';
import Points from './points';
import Games from './games';
import ScoreControls from './scorecontrols';

const ScoreRight = (props) => (
  <div className="score scoreR">
    <Points points={props.score.two.points} />
    <Games games={props.score.two.games} />
    <ScoreControls player={'two'} { ...props } />
  </div>
);

export default ScoreRight;
