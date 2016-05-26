import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
	render() {
		return(


  <div className="scores">
    <div className="score scoreL">
      <div className="games pL"><span className="number">0</span></div>
      <div className="points pL"><span className="number">0</span></div>
      <div className="scoreControls">
        <div className="scoreControls__modifier--add">+</div>
        <div className="scoreControls__modifier--subtract">-</div>
      </div>
    </div>
    <div className="score scoreR">
      <div className="points pR"><span className="number">0</span></div>
      <div className="games pR"><span className="number">0</span></div>
      <div className="scoreControls">
        <div className="scoreControls__modifier--add">+</div>
        <div className="scoreControls__modifier--subtract">-</div>
      </div>
    </div>
  </div>


		)
	}
});

export default Main;
