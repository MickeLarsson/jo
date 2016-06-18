import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actionCreators from '../actions/actionCreators';
import ScoreLeft from './scoreleft';
import ScoreRight from './scoreright';
import Winner from './winner';
import { getPerson } from '../reducers/people';

const mapStateToProps = (state) => ({
  match: state.match,
  people: state.people
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actionCreators, dispatch)

const Game = (props) => {
  const left = getPerson(props.people, props.params[props.match.position.l]);
  const right = getPerson(props.people, props.params[props.match.position.r]);

  const c = props.match.serve.initial === '' ? '' : 'hide';

  return (
    <div>
      <div id="chooseServer" className={c}>
        <div className="wrap">
          <div className="text">
            <h2><button onClick={() => props.setServer('l')}>{'\u261B'}</button> Decide who will begin to serve <button onClick={() => props.setServer('r')}>{'\u261A'}</button></h2>
            <p>Then press the button on your left</p>
            <p>(or click on the hand)</p>
          </div>
        </div>
      </div>

      <div id="names" className="playersPresentation">
        <div className="name pL">{ props.match.serve.current === 'left' ? '\u261B' : ''} {left.first} {left.last} </div>
        <div className="vs"><span>vs</span></div>
        <div className="name pR"> {right.first} {right.last} { props.match.serve.current === 'right' ? '\u261A' : '' }</div>
      </div>

      <div className="scores">
        <ScoreLeft {...props} />
        <ScoreRight {...props} />
      </div>

      <Winner {...props} />
    </div>
)};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
