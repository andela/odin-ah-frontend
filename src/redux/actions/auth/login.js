import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../../utils/setAuthToken';
import { LOGIN_USER, LOGIN_USER_ERROR } from '../../constants/index';

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
 * @param {any} user
 * @returns {void}
 */
export const loginUserFailure = error => ({
  type: LOGIN_USER_ERROR,
  error
});

/**
 * @returns {void}
 *
 * @param {any} dispatch
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(loginUser({}));
};


/**
 *
 * @returns {void}
 *
 * @param {any} userData
 */
export const userLoginRequest = userData => (dispatch) => {
  axios
    .post('https://odin-ah-backend-staging.herokuapp.com/api/v1/auth/login', userData)
    .then((response) => {
      console.log('I have just logged in', response);
      const { token } = response.data.user;
      const decodedToken = jwtDecode(token);
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(loginUser(decodedToken));
    })
    .catch((error) => {
      dispatch(loginUserFailure(error.response.data));
    });
};
