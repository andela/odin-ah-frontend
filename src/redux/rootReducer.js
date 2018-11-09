import { combineReducers } from 'redux';
import registration from './reducer/auth/register';
import verify from './reducer/auth/verify';
import notification from './reducer/notification';
import modal from './reducer/modal';

const rootReducer = combineReducers({
  registration, notification, modal, verify
});

export default rootReducer;
