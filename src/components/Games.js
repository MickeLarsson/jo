import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Games = (props) => (
  <div className="games">
    <ReactCSSTransitionGroup transitionName="flip" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
      <span key={props.games} className="number">{props.games}</span>
    </ReactCSSTransitionGroup>
  </div>
);

export default Games;
