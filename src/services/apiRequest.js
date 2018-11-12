import Axios from 'axios';
import { logout } from '../redux/actions/auth/login';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export class ApiRequest {
  /**
   *
   * @param {'facebook'|'twitter'|'google'} social
   * @return {string}
   */
  static socialAuthUrl(social) {
    return `${BASE_API_URL}/auth/${social}`;
  }

  constructor() {
    this.axios = Axios.create({
      baseURL: BASE_API_URL,
    });
    const token = localStorage.getItem('jwtToken');
    this.setToken(token);
  }

  setToken(token) {
    if (token) {
      this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete this.axios.defaults.headers.common.Authorization;
    }
  }

  /**
   *
   * @param {{email:string,password:string,username:string}} user
   * @return {Promise<object>} return a Promise of the request
   */
  createUser(user) {
    return this.axios.post('/auth/signup', user);
  }

  /**
   *
   * @param { string } token
   * @return {Promise<any>} 59c3d95d0e458f279d365c14fdcdd1b2305c3696
   */
  verityConfirmationToken(token) {
    return this.axios.get(`/auth/confirmation/${token}`);
  }

  /**
   *
   * @param {{email: string}} data
   * @return {Promise<any>}
   */
  resendVerificationToken(data) {
    return this.axios.post('/auth/confirmation', data);
  }

  fetchArticles() {
    return this.axios.get('/articles');
  }

  loginUser(data) {
    return this.axios.post('/auth/login', data);
  }

  authenticateUser() {
    return this.axios.get('/users');
  }

  registerInterceptors(store = null) {
    this.axios.interceptors.response.use(
      response => response,
      (error) => {
        const { status } = error.response;
        if (status === 401) {
          if (store) {
            store.dispatch(logout);
          }
        }
        return Promise.reject(error);
      }
    );
  }
}

const apiRequest = new ApiRequest();
export default apiRequest;
