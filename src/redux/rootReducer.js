import { combineReducers } from 'redux';
import home from './reducer/home';
import login from './reducer/login';

const rootReducer = combineReducers({
  home, login
});

export default rootReducer;
