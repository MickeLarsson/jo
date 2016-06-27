import React from 'react';
import { render } from 'react-dom';

import css from './styles/styles.scss';

import App from './components/App';
import Game from './components/Game';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path='/' component={App}></Route>
      <Route path='/game/:one/:two' component={Game}></Route>
		</Router>
	</Provider>
);

render(router, document.getElementById('root'));
