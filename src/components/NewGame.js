import React from 'react';
import { Link } from 'react-router';

const Player = (props) => {
  const otherLabel = props.side === 'one' ? 'two' : 'one';
  const isMirrorOfSelected = props.score[otherLabel].id === props.p.id;
  const isSelected = props.score[props.side].id === props.p.id;

  let classnames = ['playerList__player'];

  if (isMirrorOfSelected)
    classnames.push('disabled');

  if (isSelected)
    classnames.push('selected');

  return (
    <div className={classnames.join(' ')} id={props.p.id} >
      <input onClick={() => props.selectPlayer(props.p.id, props.side)}
              className="playerRadio disabled"
              type="radio"
              id={`${props.p.id}-${props.side}`}
              disabled={isMirrorOfSelected}
              />
      <label htmlFor={`${props.p.id}-${props.side}`}>{props.p.first} {props.p.last}</label>
    </div>
)};

const PlayerList = (props) => (
  <div className="playerList ">
    { props.people.map((person, i) => <Player key={i} p={person} {...props} />) }
  </div>
);

const NewGame = (props) => (
  <div id="app">
    <div className="container">
      <h2 className="textAlign--center">Select players</h2>
        <div className="playerLists">
          <PlayerList id='pL' side='one' {...props } />
          <PlayerList id='pR' side='two' {...props } />
        </div>
        <Link to={`game/${props.score.one.id}/${props.score.two.id}`} className='button' >Let's Go!</Link>
    </div>
  </div>
);

export default NewGame;
