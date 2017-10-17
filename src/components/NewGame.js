import React from 'react';
import { Link } from 'react-router';

const Player = ({match, side, p, selectPlayer}) => {
  const otherLabel = side === 'p1' ? 'p2' : 'p1';
  const isMirrorOfSelected = match.players[otherLabel].id === p.id;
  const isSelected = match.players[side].id === p.id;

  let classnames = ['playerList__player'];

  if (isMirrorOfSelected)
    classnames.push('disabled');

  if (isSelected)
    classnames.push('selected');

  return (
    <div className={classnames.join(' ')} id={p.id} >
      <input onClick={() => selectPlayer(p.id, side)}
              className="playerRadio disabled"
              type="radio"
              id={`${p.id}-${side}`}
              disabled={isMirrorOfSelected}
              />
      <label htmlFor={`${p.id}-${side}`}>{p.first} {p.last}</label>
    </div>
)};

const PlayerList = (props) => (
  <div className="playerList ">
    { props.people.map((person, i) => <Player key={i} p={person} {...props} />) }
  </div>
);

const NewGame = (props) => {
  const gotPlayers = (props.match.players.p1.id && props.match.players.p2.id) || false;
  return (
    <div id="app">
      <div className="container">
        <h2 className="textAlign--center">Select players</h2>
          <div className="playerLists">
            <PlayerList id='pL' side='p1' {...props } />
            <PlayerList id='pR' side='p2' {...props } />
          </div>
          <Link disabled={!gotPlayers} to={`game/${props.match.players.p1.id}/${props.match.players.p2.id}`} className='button' >Let's Go!</Link>
      </div>
    </div>
)};

export default NewGame;
