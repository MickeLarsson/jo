import React from 'react';

const ScoreRight = React.createClass({
    render() {
      return(
        <div className="score scoreR">
          <div className="points pR"><span className="number">{this.props.score.two.points}</span></div>
          <div className="games pR"><span className="number">{this.props.score.two.games}</span></div>
          <div className="scoreControls">
            <div className="scoreControls__modifier--add" onClick={() => this.props.increment()}>+</div>
            <div className="scoreControls__modifier--subtract" onClick={() => this.props.decrement()}>-</div>
          </div>
        </div>
      )
    }
});

export default ScoreRight;
