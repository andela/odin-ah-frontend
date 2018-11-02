import axios from 'axios';
/**
 *
 * @export
 * @param {any} token
 * @returns {void}
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
export default setAuthToken;
