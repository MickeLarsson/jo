import React from 'react';
import ScoreLeft from './scoreleft';
import ScoreRight from './scoreright'

const Scores = React.createClass({
    render() {
      return(
        <div className="scores">
          <ScoreLeft {...this.props} />
          <ScoreRight {...this.props} />
        </div>
      )
    }
});

export default Scores;
