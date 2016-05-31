import React from 'react';
import Points from './points';
import Games from './games';
import ScoreControls from './scorecontrols';

const ScoreLeft = (props) => (
  <div className="score scoreL">
    <Games games={props.score.one.games} />
    <Points points={props.score.one.points} />
    <ScoreControls player={'one'} { ...props } />
    <div>{props.score.server}</div>
  </div>
);

export default ScoreLeft;
