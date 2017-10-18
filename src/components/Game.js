import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actionCreators from '../actions/actionCreators';
import ScoreLeft from './scoreleft';
import ScoreRight from './scoreright';
import Winner from './winner';
import { getPerson } from '../reducers/people';
import { getServer, getNumber } from '../reducers/serve';
import { getPlayerLeft, getPlayerRight } from '../reducers/player_position';

const Game = (props) =>
  (<div>
    <div id="chooseServer" className={props.match.initialServer=== '' ? '' : 'hide'}>
      <div className="wrap">
        <div className="text">
          <h2><button onClick={() => {
            props.setServer('l');
            props.setServerSet();
          }}>{'\u261B'}</button> Decide who will begin to serve <button onClick={() => props.setServer('r')}>{'\u261A'}</button></h2>
          <p>Then press the button on your left</p>
        </div>
      </div>
    </div>

    <div id="names" className="playersPresentation">
      <div className="name pL">{ props.server === props.playerLeft ? '\u261B' : ''}&nbsp;</div>
      <div className="vs"><span>{ props.serveNumber}</span></div>
      <div className="name pR">&nbsp;{ props.server === props.playerRight ? '\u261A' : '' }</div>
    </div>

    <div className="scores">
      <ScoreLeft {...props} />
      <ScoreRight {...props} />
    </div>

    <Winner {...props} />
  </div>);

export default connect(
  state => ({
    match: state.match,
    people: state.people,
    server: getServer(state.match),
    serveNumber: getNumber(state.match),
    playerLeft: getPlayerLeft(state.match),
    playerRight: getPlayerRight(state.match),
  }),
  dispatch =>
    bindActionCreators(actionCreators, dispatch))
(Game);
