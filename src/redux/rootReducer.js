import { combineReducers } from 'redux';
import registration from './reducer/auth/register';
import verify from './reducer/auth/verify';
import notification from './reducer/notification';
import profile from './reducer/profile';
import modal from './reducer/modal';
import articles from './reducer/articles';
import bookmark from './reducer/article/bookmark';
import login from './reducer/login';
import redirect from './reducer/redirect';
import passwordResetData from './reducer/passwordReset';
import landingPageArticles from './reducer/landingPage/articles';
import landingPageTags from './reducer/landingPage/tags';
import followList from './reducer/users/followList';
import comment from './reducer/comment';

const rootReducer = combineReducers({
  registration,
  notification,
  modal,
  bookmark,
  verify,
  login,
  articles,
  passwordResetData,
  landingPageArticles,
  landingPageTags,
  profile,
  redirect,
  followList,
  comment
});

export default rootReducer;
