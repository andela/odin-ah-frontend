import { combineReducers } from 'redux';
import registration from './reducer/auth/register';
import notification from './reducer/notification';
import modal from './reducer/modal';
import home from './reducer/home';
import login from './reducer/login';

const rootReducer = combineReducers({
  home, registration, notification, modal, login
});

export default rootReducer;
