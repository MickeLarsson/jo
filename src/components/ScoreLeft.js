import React from 'react';

const ScoreLeft = (props) => (
  <div className="score scoreL">
    <div className="games pL"><span className="number">{props.score.one.games}</span></div>
    <div className="points pL"><span className="number">{props.score.one.points}</span></div>
    <div className="scoreControls">
      <div className="scoreControls__modifier--add" onClick={() => props.increment('one')}>+</div>
      <div className="scoreControls__modifier--subtract" onClick={() => props.decrement('one')}>-</div>
    </div>
    <div>{props.score.server}</div>
  </div>
);

export default ScoreLeft;
