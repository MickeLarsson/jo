import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index'
import { getPeople } from './actions/actionCreators';
import people from './data/people';

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
// let socket = io('localhost:3000');
let socket = io('http://163.172.135.124:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const enhancers = compose(
    applyMiddleware(socketIoMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  );

const persistedPeople = {
  people: people.sort((a, b) => {
    if (a.last > b.last)
      return 1;

    if (a.last < b.last)
      return -1;

    return 0;
  })
}

const store = createStore(rootReducer, persistedPeople, enhancers);

store.subscribe(() => {
  //push score to log server
  const score = store.getState().match.score;
  const { p1, p2 } = score;
  console.log(`(${p1.games}) ${p1.points}:${p2.points} (${p2.games})`);
});

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

store.dispatch({type:'server/hello', data:'Hello!'});

export default store;
