import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Points = (props) => (
  <div className="points">
    <ReactCSSTransitionGroup transitionName="flip" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
      <span key={props.points} className="number">{props.points}</span>
    </ReactCSSTransitionGroup>
  </div>
  );

export default Points;
