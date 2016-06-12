import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index'
import { getPeople } from './actions/actionCreators';
import people from './data/people';

const enhancers = compose(
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
  const { one, two } = score;
  console.log(`(${one.games}) ${one.points}:${two.points} (${two.games})`);
});

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
