import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import score from './score';
import people from './people';

const rootReducer = combineReducers({ score, people, routing: routerReducer});

export default rootReducer;
