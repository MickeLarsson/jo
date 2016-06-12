import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import match from './match';
import people from './people';

const rootReducer = combineReducers({ match, people, routing: routerReducer});

export default rootReducer;
