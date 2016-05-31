import React from 'react';

const ScoreControls = (props) => (
  <div className="scoreControls">
      <div className="scoreControls__modifier--add" onClick={() => props.increment(props.player)}>+</div>
      <div className="scoreControls__modifier--subtract" onClick={() => props.decrement(props.player)}>-</div>
    </div>
);

export default ScoreControls;