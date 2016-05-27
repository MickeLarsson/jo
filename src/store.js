import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index'

const defaultState = {
  score: {one: { points: 0, games: 1 }, two: { points: 2, games: 2 }, gameover: false}
};

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  );

const store = createStore(rootReducer, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
