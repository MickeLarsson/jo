import React from 'react';
import { Link } from 'react-router';

const Player = (props) => (
  <div className="playerList__player " id="{props.id}" >
    <input onClick={() => console.log(props.p.id)}
            className="playerRadio"
            type="radio"
            id="{props.p.id}-{props.side}" />
    <label htmlFor="{props.p.id}-{props.side}">{props.i}. {props.p.first} {props.p.last}</label>
  </div>
);

const PlayerList = (props) => (
  <div className="playerList ">
    { props.people.map((p, i) => <Player key={i} i={i} p={p} {...props} />) }
  </div>
);

const NewGame = (props) => (
  <div id="app">
    <div className="container">
      <h2 className="textAlign--center">Select players</h2>
        <div className="playerLists">
          <PlayerList id='pL' side='l' {...props } />
          <PlayerList id='pR' side='r' {...props } />
        </div>
        <Link to='game/jimhur/oskgus' className='button' >Let's Go!</Link>
    </div>
  </div>
);

export default NewGame;
