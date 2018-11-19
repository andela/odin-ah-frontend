import {
  AUTHENTICATING, LOGIN_USER, LOGIN_USER_ERROR, LOGOUT_USER
} from '../../constants/index';
import { dispatchError, getErrorMessage } from './register';
import apiRequest from '../../../services/apiRequest';

export const loginUser = user => ({
  type: LOGIN_USER,
  user
});

export const loginUserFailure = error => ({
  type: LOGIN_USER_ERROR,
  error
});

export const logout = () => {
  localStorage.removeItem('jwtToken');
  return {
    type: LOGOUT_USER
  };
};

export const authenticating = loading => ({
  type: AUTHENTICATING,
  loading
});

function dispatchAuthenticationError(dispatch, error) {
  const { message } = getErrorMessage(error);
  dispatch(loginUserFailure({ message }));
}

export const getAuthUserProfile = () => (dispatch) => {
  apiRequest
    .authenticateUser()
    .then((result) => {
      const { profile } = result.data;
      dispatch(loginUser(profile));
    })
    .catch((error) => {
      dispatchAuthenticationError(dispatch, error);
    });
};

export const userLoginRequest = userData => (dispatch) => {
  dispatch(authenticating(true));
  apiRequest
    .loginUser(userData)
    .then((response) => {
      const { user } = response.data;
      localStorage.setItem('jwtToken', user.token);
      apiRequest.setToken(user.token);
      dispatch(authenticating(false));
      dispatch(getAuthUserProfile());
    })
    .catch((error) => {
      dispatch(authenticating(false));
      let message;
      let type;
      if (error.response && error.response.status === 403) {
        message = 'Your email is not yet verified. Please check your email for further instructions.'
          + '<br/> <a href="./email-verification/resend">Click here to resend verification link</a>';
        type = 'alert';
      } else {
        (
          {
            message,
            type
          } = getErrorMessage(error));
      }
      dispatchError(message, type, dispatch);
      dispatchAuthenticationError(dispatch, error);
    });
};
