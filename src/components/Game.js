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
  const one = getPerson(props.people, props.params.one);
  const two = getPerson(props.people, props.params.two);

  return (
    <div>
      <div id="names" className="playersPresentation">
        <div className="name pL">{ props.match.serve.current === 'one' ? '\u261B' : ''} {one.first} {one.last} </div>
        <div className="vs"><span>vs</span></div>
        <div className="name pR"> {two.first} {two.last} { props.match.serve.current === 'two' ? '\u261A' : '' }</div>
      </div>

      <div className="scores">
        <ScoreLeft {...props} />
        <ScoreRight {...props} />
      </div>

      <Winner {...props} />

    </div>
)};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
