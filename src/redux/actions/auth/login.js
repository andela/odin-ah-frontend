import jwtDecode from 'jwt-decode';
import setAuthToken from '../../../utils/setAuthToken';
import { AUTHENTICATING, LOGIN_USER, LOGIN_USER_ERROR } from '../../constants/index';
import apiRequest from '../../../services/apiRequest';
import { dispatchError, getErrorMessage } from './register';

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {void}
 */
export const loginUser = user => ({
  type: LOGIN_USER,
  user
});

/**
 *
 *
 * @export
 * @returns {void}
 * @param error
 */
export const loginUserFailure = error => ({
  type: LOGIN_USER_ERROR,
  error
});

/**
 * @returns {void}
 *
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(loginUser({}));
};

export const authenticating = loading => ({
  type: AUTHENTICATING,
  loading,
});

/**
 *
 * @returns {void}
 *
 * @param {any} userData
 */
export const userLoginRequest = userData => (dispatch) => {
  dispatch(authenticating(true));
  apiRequest.loginUser(userData)
    .then((response) => {
      const { token } = response.data.user;
      const decodedToken = jwtDecode(token);
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(authenticating(false));
      dispatch(loginUser(decodedToken));
    })
    .catch((error) => {
      dispatch(authenticating(false));
      const { message, type } = getErrorMessage(error);
      dispatchError(message, type, dispatch);
      dispatch(loginUserFailure(error.response.data));
    });
};
