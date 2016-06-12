import React from 'react';
import { Link } from 'react-router';

const Player = ({match, side, p, selectPlayer}) => {
  const otherLabel = side === 'one' ? 'two' : 'one';
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

const NewGame = (props) => (
  <div id="app">
    <div className="container">
      <h2 className="textAlign--center">Select players</h2>
        <div className="playerLists">
          <PlayerList id='pL' side='one' {...props } />
          <PlayerList id='pR' side='two' {...props } />
        </div>
        <Link to={`game/${props.match.players.one.id}/${props.match.players.two.id}`} className='button' >Let's Go!</Link>
    </div>
  </div>
);

export default NewGame;
