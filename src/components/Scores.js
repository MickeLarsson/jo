import React from 'react';
import ScoreLeft from './scoreleft';
import ScoreRight from './scoreright'

//\u25B6
//\u25C0

//\u261B
//\u261A
const Scores = (props) => (
  <div>
    <div id="names" className="playersPresentation">
      <div className="name pL">{ props.score.server === 'one' ? '\u261B' : ''} {props.score.one.name}</div>
      <div className="vs"><span>vs</span></div>
      <div className="name pR">{props.score.two.name} { props.score.server === 'two' ? '\u261A' : '' }</div>
    </div>

    <div className="scores">
      <ScoreLeft {...props} />
      <ScoreRight {...props} />
    </div>

    <a onClick={()=>props.setName('one', 'Left Fisk')}>Left</a>
    <a onClick={()=>props.setName('two', 'Right Fisk')}>Right</a>
  </div>
);

export default Scores;
