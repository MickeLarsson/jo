import React from 'react';
import ScoreLeft from './scoreleft';
import ScoreRight from './scoreright'

const Scores = (props) => (
  <div className="scores">
    <ScoreLeft {...props} />
    <ScoreRight {...props} />
  </div>
);

export default Scores;
