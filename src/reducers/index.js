import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import match from './match';
import people from './people';


const socket = (state = {}, action) => {
  console.log('socket reducer');
  switch(action.type){
    case 'left': {
        console.log(action);
        return Object.assign({}, {message:action.data});
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({ socket, match, people, routing: routerReducer});

export default rootReducer;
