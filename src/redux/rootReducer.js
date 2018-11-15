import { combineReducers } from 'redux';
import registration from './reducer/auth/register';
import verify from './reducer/auth/verify';
import notification from './reducer/notification';
import modal from './reducer/modal';
import articles from './reducer/articles';
import login from './reducer/login';
import passwordResetData from './reducer/passwordReset';


const rootReducer = combineReducers({
  registration, notification, modal, verify, login, articles, passwordResetData
});

export default rootReducer;
