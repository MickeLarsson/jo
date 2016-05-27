import React from 'react';

const ScoreLeft = React.createClass({
    render() {
        return(
          <div className="score scoreL">
            <div className="games pL"><span className="number">{this.props.score.one.games}</span></div>
            <div className="points pL"><span className="number">{this.props.score.one.points}</span></div>
            <div className="scoreControls">
              <div className="scoreControls__modifier--add">+</div>
              <div className="scoreControls__modifier--subtract">-</div>
            </div>
          </div>
        )
    }
});

export default ScoreLeft;
