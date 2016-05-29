import React from 'react';

const ScoreRight = (props) => (
  <div className="score scoreR">
    <div className="points pR"><span className="number">{props.score.two.points}</span></div>
    <div className="games pR"><span className="number">{props.score.two.games}</span></div>
    <div className="scoreControls">
      <div className="scoreControls__modifier--add" onClick={() => props.increment('two')}>+</div>
      <div className="scoreControls__modifier--subtract" onClick={() => props.decrement('two')}>-</div>
    </div>
  </div>
);

export default ScoreRight;
